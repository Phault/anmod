import React, { useCallback } from 'react';
import {
  NavigationScreenConfig,
  NavigationScreenOptions,
  NavigationInjectedProps
} from 'react-navigation';
import { MediaCardOverview } from '../../components/MediaCardOverview';
import { useStores } from '../../store/StoreContext';
import { ShowDetailsParams } from './ShowDetailsScreen';
import { Instance } from 'mobx-state-tree';
import { Show } from '../../store/media/shows/Show';
import { SearchView } from '../../components/SearchView';

export const ShowSearchScreen = ({ navigation }: NavigationInjectedProps) => {
  const onPress = useCallback(
    show => {
      navigation.push('Details', {
        id: show.id
      } as ShowDetailsParams);
    },
    [navigation]
  );

  const { media } = useStores();

  return (
    <SearchView<Instance<typeof Show>>
      initialQuery={
        (navigation.state.params && navigation.state.params.term) || ''
      }
      placeholder="Search shows..."
      onSearch={query => media.shows.search(query)}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <MediaCardOverview
          media={item}
          onPress={() => onPress(item)}
          style={{ margin: 5, borderRadius: 3 }}
        />
      )}
    />
  );
};

ShowSearchScreen.navigationOptions = {
  header: null
} as NavigationScreenConfig<NavigationScreenOptions>;
