import {
  types,
  IAnyModelType,
  Instance,
  flow,
  getParentOfType,
  castToReferenceSnapshot,
  isValidReference,
  tryReference
} from 'mobx-state-tree';
import { MovieRequest } from '../../requests/movies/MovieRequest';
import { api } from '../../../api';
import { ThenArg } from '../../../types/ThenArg';
import { shim, action } from 'classy-mst';
import { BaseModel } from '../../BaseModel';
import { PosterSizes, BackdropSizes } from '../../../types/ImageSizes';
import { RequestType } from '../../../types/RequestType';
import { $enum } from 'ts-enum-util';
import { MovieStore } from './MovieStore';
import { mstWithReferenceChildren } from '../../../utils/RecursiveType';
import { RequestStatus } from '../../requests/RequestStatus';

const MovieData = BaseModel.props({
  id: types.identifierNumber,
  title: types.string,
  releaseDate: types.Date,
  overview: types.string,
  imdbId: types.maybeNull(types.string),
  posterPath: types.maybeNull(types.string),
  backdropPath: types.maybeNull(types.string),
  _request: types.maybeNull(
    types.reference(types.late((): IAnyModelType => MovieRequest))
  ),
  available: false,
  plexUrl: types.maybeNull(types.string),
  embyUrl: types.maybeNull(types.string)
});

class MovieCode extends shim(MovieData) {
  similar: (this | MovieCode)[];

  get status(): RequestStatus | 'available' {
    if (this.available) return 'available';

    const request = tryReference(() => this.request);
    if (request) return request.status;

    return RequestStatus.None;
  }

  get request(): Instance<typeof MovieRequest> {
    return this._request;
  }

  get isReleased() {
    return this.releaseDate.getTime() < Date.now();
  }

  get isRequested() {
    return isValidReference(() => this.request);
  }

  poster(size: PosterSizes) {
    return this.posterPath
      ? `https://image.tmdb.org/t/p/${size}${this.posterPath}`
      : null;
  }

  backdrop(size: BackdropSizes) {
    return this.backdropPath
      ? `https://image.tmdb.org/t/p/${size}${this.backdropPath}`
      : null;
  }

  @action
  setRequest(request: Instance<typeof MovieRequest>) {
    this._request = request;
  }

  @action
  fetchSimilar() {
    const self = this;

    return flow(function*() {
      const movieStore = getParentOfType(self, MovieStore);

      const {
        data: similar
      } = (yield api.search.searchMovieByTheMovieDbIdSimilarGet(
        self.id
      )) as ThenArg<typeof api.search.searchMovieByTheMovieDbIdSimilarGet>;

      self.similar = [...similar]
        .sort((a, b) => a.id - b.id) // makes sure they don't shift around
        .map(m => movieStore.updateFromServer(m).id) as any;

      return self.similar;
    })();
  }
}

export const { Model: Movie } = mstWithReferenceChildren(
  MovieCode,
  MovieData,
  'Movie'
);
