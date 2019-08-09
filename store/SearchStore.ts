import { types, flow, getParentOfType } from 'mobx-state-tree';
import { Movie } from './media/Movie';
import { api } from '../api';
import { RootStore } from './RootStore';
import { ThenArg } from '../types/ThenArg';

export const MovieSearch = types
  .model('MovieSearch', {
    query: '',
    isSearching: false,
    results: types.array(types.reference(Movie)),
    error: types.maybeNull(types.string)
  })
  .actions(self => ({
    search: flow(function*(query: string) {
      self.isSearching = true;
      self.query = query;

      try {
        const response = (yield api.search.searchMovieBySearchTermGet(
          query
        )) as ThenArg<typeof api.search.searchMovieBySearchTermGet>;

        const mediaStore = getParentOfType(self, RootStore).media;
        response.data.forEach(mediaStore.updateMovieFromServer);

        self.results = response.data.map(m => m.id!) as any;
      } catch (e) {
        self.error = e.message;
      }

      self.isSearching = false;
    })
  }));

export const SearchStore = types.model('SearchStore', {
  movies: types.optional(MovieSearch, {})
  // shows: types.string,
});
