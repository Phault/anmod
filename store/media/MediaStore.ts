import {
  types,
  SnapshotIn,
  getParentOfType,
  flow,
  Instance
} from 'mobx-state-tree';
import { Movie } from './Movie';
import { Show } from './Show';
import {
  OmbiCoreModelsSearchSearchMovieViewModel,
  OmbiStoreEntitiesRequestsMovieRequests
} from '../../ombi-api/model';
import { TheMovieDbId, TheTvDbId } from '../../types/ids';
import { api } from '../../api';
import { ThenArg } from '../../types/ThenArg';
import { shim, action, mst } from 'classy-mst';
import { RootStore } from '../RootStore';
import { merge } from '../../utils/merge';
import { RequestType } from '../../types/RequestType';

function movieSnapshotFromServerMovie(
  serverMovie: OmbiCoreModelsSearchSearchMovieViewModel
) {
  const snapshot: SnapshotIn<typeof Movie> = {
    id: serverMovie.id,
    available: serverMovie.available,
    background: serverMovie.backdropPath,
    poster: serverMovie.posterPath,
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

function movieSnapshotFromServerMovieRequest(
  serverRequest: OmbiStoreEntitiesRequestsMovieRequests
) {
  const snapshot: SnapshotIn<typeof Movie> = {
    id: serverRequest.theMovieDbId,
    available: serverRequest.available,
    background: serverRequest.background,
    poster: serverRequest.posterPath,
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

const MediaStoreData = types.model({
  movies: types.map(Movie),
  shows: types.map(Show)
});

class MediaStoreCode extends shim(MediaStoreData) {
  @action
  updateMovie(
    patch: OmbiCoreModelsSearchSearchMovieViewModel
  ): Instance<typeof Movie> {
    const existingMovie = this.movies.get(patch.id.toString());
    if (existingMovie) merge(existingMovie, patch);

    return existingMovie || this.movies.put(patch);
  }

  @action
  updateMovieFromServer(
    serverMovie: OmbiCoreModelsSearchSearchMovieViewModel
  ): Instance<typeof Movie> {
    const movieSnapshot = movieSnapshotFromServerMovie(serverMovie);

    if (movieSnapshot._request) {
      const requestStore = getParentOfType(this, RootStore).requests;
      movieSnapshot._request = requestStore.updateMovieRequestWithServerMovie(
        serverMovie
      ).id;
    }

    return this.updateMovie(movieSnapshot);
  }

  @action
  updateMovieFromServerRequest(
    serverRequest: OmbiStoreEntitiesRequestsMovieRequests
  ): Instance<typeof Movie> {
    const movieSnapshot = movieSnapshotFromServerMovieRequest(serverRequest);
    return this.updateMovie(movieSnapshot);
  }

  @action
  fetchMovie(id: TheMovieDbId) {
    const self = this;

    return flow(function*() {
      const { data } = (yield api.search.searchMovieInfoByTheMovieDbIdGet(
        id
      )) as ThenArg<typeof api.search.searchMovieInfoByTheMovieDbIdGet>;

      return self.updateMovieFromServer(
        data
      ) as ReturnType<typeof self.updateMovieFromServer>;
    })();
  }

  @action
  fetch(id: TheMovieDbId | TheTvDbId, type: RequestType) {
    switch (type) {
      case RequestType.Movie:
        return this.fetchMovie(id);
    }

    throw new Error('Unknown type');
  }

  get(id: TheMovieDbId | TheTvDbId, type: RequestType) {
    switch (type) {
      case RequestType.Movie:
        return this.movies.get(id.toString());
    }

    throw new Error('Unknown type');
  }
}

export const MediaStore = mst(MediaStoreCode, MediaStoreData, 'MediaStore');
