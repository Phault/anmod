import React, { useCallback, useEffect } from 'react';
import {
  ListRenderItem,
  StyleProp,
  ViewStyle,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import { FlatList } from 'react-navigation';
import { useLocalStore, useObserver, observer } from 'mobx-react-lite';
import { runInAction, action } from 'mobx';
import { ActivityIndicator } from 'react-native-paper';
import { throttle } from 'lodash';
import { ListEmptyComponent as DefaultListEmptyComponent } from './ListEmptyComponent';

export interface EndlessListProps<T> {
  fetchItems: (count: number, offset: number) => Promise<T[]>;
  keyExtractor: (item: T) => string;
  renderItem: ListRenderItem<T>;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  style?: StyleProp<ViewStyle>;
  itemsPerBatch?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export function EndlessList<T = any>({
  keyExtractor,
  fetchItems,
  itemsPerBatch = 10,
  renderItem,
  ListEmptyComponent = DefaultListEmptyComponent,
  style,
  contentContainerStyle
}: EndlessListProps<T>) {
  const state = useLocalStore(() => ({
    items: [],
    isLoadingMore: false,
    isRefreshing: false,

    refresh: action(async () => {
      state.isRefreshing = true;
      state.items = [];

      await state.loadMore();

      runInAction(() => {
        state.isRefreshing = false;
      });
    }),

    loadMore: action(async () => {
      if (state.isLoadingMore) return;

      state.isLoadingMore = true;

      try {
        const items = await fetchItems(itemsPerBatch, state.items.length);
        runInAction(() => {
          state.items = state.items.concat(
            items.filter(i => !state.items.includes(i))
          );
        });
      } catch (e) {
        ToastAndroid.show(e.message, ToastAndroid.SHORT);
      } finally {
        runInAction(() => {
          state.isLoadingMore = false;
        });
      }
    })
  }));

  useEffect(() => {
    state.refresh();
  }, [state]);

  const listFooter = useCallback(() => <EndlessListFooter state={state} />, [
    state
  ]);

  const loadMore = useCallback(throttle(state.loadMore, 2000), [
    state.loadMore
  ]);

  return useObserver(() => (
    <FlatList
      keyExtractor={keyExtractor}
      data={state.items}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={listFooter}
      style={style}
      contentContainerStyle={contentContainerStyle}
      onEndReached={loadMore}
      onEndReachedThreshold={1}
      refreshing={state.isRefreshing}
      onRefresh={state.refresh}
    />
  ));
}

export const EndlessListFooter = observer(({ state }: any) => (
  <ActivityIndicator
    animating={state.isLoadingMore && !state.isRefreshing}
    size="large"
    style={styles.indicator}
  />
));

const styles = StyleSheet.create({
  indicator: {
    paddingVertical: 10
  }
});
