import React from 'react';
import { View, ListRenderItem, StyleSheet } from 'react-native';
import {
  FlatList,
  NavigationInjectedProps,
  withNavigation
} from 'react-navigation';
import { Text, Appbar, Searchbar, Surface } from 'react-native-paper';
import { useObserver, useLocalStore, useDisposable } from 'mobx-react-lite';
import { HorizontalActivityIndicator } from './HorizontalActivityIndicator';
import { runInAction, reaction } from 'mobx';
import { useTheme } from '../Theme';
import Constants from 'expo-constants';

export interface SearchViewProps<T> extends Partial<NavigationInjectedProps> {
  placeholder?: string;
  initialQuery?: string;
  onSearch: (query: string) => Promise<T[]>;
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T) => string;
}

export const SearchView = withNavigation(
  <T extends any>({
    initialQuery,
    placeholder,
    onSearch,
    renderItem,
    keyExtractor,
    navigation
  }: SearchViewProps<T>) => {
    const theme = useTheme();

    const state = useLocalStore(() => ({
      query: initialQuery,
      items: [],
      error: null,
      isSearching: false,

      async search() {
        state.isSearching = true;

        try {
          const items = await onSearch(state.query);

          runInAction(() => {
            state.items = items;
          });
        } catch (e) {
          runInAction(() => {
            state.error = e.message;
          });
        } finally {
          runInAction(() => {
            state.isSearching = false;
          });
        }
      }
    }));

    useDisposable(
      () =>
        reaction(() => state.query, () => state.search(), {
          fireImmediately: true,
          delay: 300
        }),
      [state]
    );

    return useObserver(() => (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background }
        ]}>
        <Surface style={styles.headerSurface}>
          <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
            <Searchbar
              autoFocus
              placeholder={placeholder}
              value={state.query}
              onChangeText={newQuery =>
                runInAction(() => {
                  state.query = newQuery;
                })
              }
              icon="arrow-back"
              style={styles.searchBar}
              onIconPress={() => {
                navigation.goBack();
              }}
            />

            {state.isSearching && (
              <HorizontalActivityIndicator style={styles.activityIndicator} />
            )}
          </Appbar.Header>
        </Surface>

        <View style={styles.resultsWrapper}>
          {state.error ? (
            <Text>{state.error}</Text>
          ) : (
            <FlatList<T>
              style={styles.searchResults}
              data={state.items}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          )}
        </View>
      </View>
    ));
  }
) as <T extends any>(props: SearchViewProps<T>) => JSX.Element;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchResults: {
    flex: 1
  },
  activityIndicator: {
    position: 'absolute',
    bottom: -6, // accounts for hardcoded 6px vertical padding
    left: 0,
    right: 0
  },
  resultsWrapper: {
    padding: 10,
    flex: 1
  },
  searchBar: {
    elevation: 0,
    flex: 1
  },
  headerSurface: {
    paddingTop: Constants.statusBarHeight
  }
});
