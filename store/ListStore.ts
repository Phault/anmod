import {
  types,
  getParentOfType,
  ISimpleType,
  IAnyType,
  flow
} from 'mobx-state-tree';
import { Show } from './media/Show';
import { Movie } from './media/Movie';
import { OmbiCoreModelsSearchSearchMovieViewModel } from '../ombi-api/model';
import { RootStore } from './RootStore';
import { MovieLists, ShowLists, api } from '../api';
import { BaseModel } from './BaseModel';
import { shim, mst, action } from 'classy-mst';
import { ThenArg } from '../types/ThenArg';

function createListType<T extends string, IT extends IAnyType>(
  name: string,
  itemType: IT
) {
  return BaseModel.named(name).props({
    id: types.identifier as ISimpleType<T>,
    items: types.array(types.reference(itemType))
  });
}

export const MovieList = createListType<MovieLists, typeof Movie>(
  'MovieList',
  Movie
);
export const ShowList = createListType<ShowLists, typeof Show>(
  'ShowList',
  Show
);

const ListStoreData = types.model({
  movies: types.map(MovieList),
  shows: types.map(ShowList)
});

class ListStoreCode extends shim(ListStoreData) {
  @action
  updateMovieListFromServer(
    list: MovieLists,
    items: OmbiCoreModelsSearchSearchMovieViewModel[]
  ) {
    const mediaStore = getParentOfType(this, RootStore).media;

    items.forEach(mediaStore.updateMovieFromServer);

    return this.movies.put({
      id: list,
      items: items.map(i => i.id!)
    });
  }

  @action
  fetchMovieList(list: MovieLists) {
    const self = this;

    return flow(function*() {
      const { data } = (yield api.lists.getMovieList(list)) as ThenArg<
        typeof api.lists.getMovieList
      >;
      return self.updateMovieListFromServer(list, data);
    })();
  }
}

export const ListStore = mst(ListStoreCode, ListStoreData, 'ListStore');
