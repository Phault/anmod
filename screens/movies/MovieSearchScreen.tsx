import React, { useCallback } from 'react';
import {
  NavigationScreenConfig,
  NavigationScreenOptions,
  NavigationInjectedProps
} from 'react-navigation';
import { MediaCardOverview } from '../../components/MediaCardOverview';
import { useStores } from '../../store/StoreContext';
import { MovieDetailsParams } from './MovieDetailsScreen';
import { Instance } from 'mobx-state-tree';
import { Movie } from '../../store/media/movies/Movie';
import { SearchView } from '../../components/SearchView';

export const MovieSearchScreen = ({ navigation }: NavigationInjectedProps) => {
  const onPress = useCallback(
    movie => {
      navigation.push('Details', {
        id: movie.id
      } as MovieDetailsParams);
    },
    [navigation]
  );

  const { media } = useStores();

  return (
    <SearchView<Instance<typeof Movie>>
      initialQuery={
        (navigation.state.params && navigation.state.params.term) || ''
      }
      placeholder="Search movies..."
      onSearch={query => media.movies.search(query)}
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

MovieSearchScreen.navigationOptions = {
  header: null
} as NavigationScreenConfig<NavigationScreenOptions>;
