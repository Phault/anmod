import React, { useState, useEffect, useRef, useCallback, FC } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  NavigationScreenConfig,
  NavigationScreenOptions,
  FlatList
} from 'react-navigation';
import { Text, Appbar, Searchbar, Surface } from 'react-native-paper';
import { MovieView } from '../../components/MovieView';
import { useStores } from '../../store/StoreContext';
import { useObserver, observer } from 'mobx-react-lite';
import debounce from 'lodash.debounce';
import { Instance } from 'mobx-state-tree';
import { Movie } from '../../store/media/Movie';
import Constants from 'expo-constants';
import { HorizontalActivityIndicator } from '../../components/HorizontalActivityIndicator';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#263238',
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
    elevation: 4,
    paddingTop: Constants.statusBarHeight
  },
  appbar: {
    backgroundColor: '#37474F'
  }
});

export interface SearchResultsProps {
  results: Instance<typeof Movie>[];
  onPress: (movie: Instance<typeof Movie>) => void;
}

export const SearchResults: FC<SearchResultsProps> = observer(
  ({ results, onPress }) => (
    <FlatList<any>
      style={styles.searchResults}
      data={results}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <MovieView
          movie={item}
          onPress={() => onPress(item)}
          style={{ margin: 5, borderRadius: 3 }}
        />
      )}
    />
  )
);

export const MovieSearchScreen = ({ navigation }) => {
  const initialTerm =
    (navigation.state.params && navigation.state.params.term) || '';

  const { search } = useStores();
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query) search.movies.search(query);
    }, 300),
    []
  );

  const [query, setQuery] = useState(initialTerm);
  useEffect(() => debouncedSearch(query), [query]);

  const inputRef = useRef<Searchbar>();
  useEffect(() => {
    inputRef.current!.focus();
  }, []);

  return useObserver(() => (
    <View style={styles.container}>
      <Surface style={styles.headerSurface}>
        <Appbar.Header style={styles.appbar}>
          <Searchbar
            ref={inputRef}
            placeholder="Search movies..."
            onChangeText={setQuery}
            value={query}
            icon="arrow-back"
            style={styles.searchBar}
            onSubmitEditing={() => debouncedSearch.flush()}
            onIconPress={() => {
              navigation.goBack();
            }}
          />
          {search.movies.isSearching && (
            <HorizontalActivityIndicator style={styles.activityIndicator} />
          )}
        </Appbar.Header>
      </Surface>
      <View style={styles.resultsWrapper}>
        {search.movies.error ? (
          <Text>{search.movies.error}</Text>
        ) : (
          <SearchResults
            results={search.movies.results}
            onPress={movie => navigation.push('Details', { movieId: movie.id })}
          />
        )}
      </View>
    </View>
  ));
};

MovieSearchScreen.navigationOptions = {
  header: null
} as NavigationScreenConfig<NavigationScreenOptions>;
