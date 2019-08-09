import {
  types,
  SnapshotIn,
  getParentOfType,
  flow,
  Instance
} from 'mobx-state-tree';
import { Movie } from './Movie';
import { Show } from './Show';
import { OmbiCoreModelsSearchSearchMovieViewModel } from '../../ombi-api/model';
import { TheMovieDbId } from '../../types/ids';
import { api } from '../../api';
import { ThenArg } from '../../types/ThenArg';
import { shim, action, mst } from 'classy-mst';
import { RootStore } from '../RootStore';
import { merge } from '../../utils/merge';

function movieSnapshotFromServer(
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
    const movieSnapshot = movieSnapshotFromServer(serverMovie);

    if (movieSnapshot._request) {
      const requestStore = getParentOfType(this, RootStore).requests;
      movieSnapshot._request = requestStore.updateMovieRequestWithServerMovie(
        serverMovie
      ).id;
    }

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
}

export const MediaStore = mst(MediaStoreCode, MediaStoreData, 'MediaStore');
