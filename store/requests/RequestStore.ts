import { types } from 'mobx-state-tree';
import { shim, mst } from 'classy-mst';
import { MovieRequestStore } from './movies/MovieRequestStore';
import { ShowRequestStore } from './shows/ShowRequestStore';

const RequestStoreData = types.model({
  movies: types.optional(MovieRequestStore, {}),
  shows: types.optional(ShowRequestStore, {})
});

class RequestStoreCode extends shim(RequestStoreData) {}

export const RequestStore = mst(
  RequestStoreCode,
  RequestStoreData,
  'RequestStore'
);
