import {
  types,
  SnapshotIn,
  getParentOfType,
  flow,
  Instance
} from 'mobx-state-tree';
import { Movie } from './Movie';
import {
  OmbiCoreModelsSearchSearchMovieViewModel,
  OmbiStoreEntitiesRequestsMovieRequests
} from '../../../ombi-api/model';
import { TheMovieDbId } from '../../../types/ids';
import { api } from '../../../api';
import { ThenArg } from '../../../types/ThenArg';
import { shim, action, mst } from 'classy-mst';
import { RootStore } from '../../RootStore';
import { merge } from '../../../utils/merge';

function snapshotFromServerMovie(
  serverMovie: OmbiCoreModelsSearchSearchMovieViewModel
) {
  const snapshot: SnapshotIn<typeof Movie> = {
    id: serverMovie.id,
    available: serverMovie.available,
    backdropPath: serverMovie.backdropPath,
    posterPath: serverMovie.posterPath,
    imdbId: serverMovie.imdbId || undefined,
    overview: serverMovie.overview,
    title: serverMovie.title,
    releaseDate: new Date(
      serverMovie.releaseDate || serverMovie.digitalReleaseDate!
    ),
    _request: serverMovie.requested ? serverMovie.requestId : undefined,
    plexUrl: serverMovie.plexUrl,
    embyUrl: serverMovie.embyUrl,
    lastUpdated: new Date()
  };

  return snapshot;
}

function snapshotFromServerRequest(
  serverRequest: OmbiStoreEntitiesRequestsMovieRequests
) {
  const snapshot: SnapshotIn<typeof Movie> = {
    id: serverRequest.theMovieDbId,
    available: serverRequest.available,
    backdropPath: serverRequest.background,
    posterPath: serverRequest.posterPath,
    imdbId: serverRequest.imdbId || undefined,
    overview: serverRequest.overview,
    title: serverRequest.title,
    releaseDate: new Date(
      serverRequest.releaseDate || serverRequest.digitalReleaseDate!
    ),
    _request: serverRequest.id,
    lastUpdated: new Date()
  };

  return snapshot;
}

const MovieStoreData = types.model({
  movies: types.map(Movie)
});

class MovieStoreCode extends shim(MovieStoreData) {
  get(id: TheMovieDbId | string) {
    return this.movies.get(id.toString());
  }

  @action
  update(patch: SnapshotIn<typeof Movie>): Instance<typeof Movie> {
    const existing = this.movies.get(patch.id.toString());
    if (existing) merge(existing, patch);

    return existing || this.movies.put(patch);
  }

  @action
  updateFromServer(
    serverMovie: OmbiCoreModelsSearchSearchMovieViewModel
  ): Instance<typeof Movie> {
    const snapshot = snapshotFromServerMovie(serverMovie);

    if (snapshot._request) {
      const requestStore = getParentOfType(this, RootStore).requests.movies;
      snapshot._request = requestStore.updateWithServerMovie(serverMovie).id;
    }

    return this.update(snapshot);
  }

  @action
  updateFromServerRequest(
    serverRequest: OmbiStoreEntitiesRequestsMovieRequests
  ): Instance<typeof Movie> {
    const snapshot = snapshotFromServerRequest(serverRequest);
    return this.update(snapshot);
  }

  @action
  fetch(id: TheMovieDbId) {
    const self = this;

    return flow(function*() {
      const { data } = (yield api.search.searchMovieInfoByTheMovieDbIdGet(
        id
      )) as ThenArg<typeof api.search.searchMovieInfoByTheMovieDbIdGet>;

      return self.updateFromServer(
        data
      ) as ReturnType<typeof self.updateFromServer>;
    })();
  }

  @action
  search(query: string): Promise<Instance<typeof Movie>[]> {
    if (!query) return Promise.resolve([]);

    const self = this;

    return flow(function*() {
      const response = (yield api.search.searchMovieBySearchTermGet(
        query
      )) as ThenArg<typeof api.search.searchMovieBySearchTermGet>;

      return response.data.map(self.updateFromServer);
    })();
  }
}

export const MovieStore = mst(MovieStoreCode, MovieStoreData, 'MovieStore');
