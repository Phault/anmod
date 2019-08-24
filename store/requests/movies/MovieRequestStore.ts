import {
  types,
  Instance,
  SnapshotIn,
  flow,
  getParentOfType
} from 'mobx-state-tree';
import {
  OmbiStoreEntitiesRequestsMovieRequests,
  OmbiCoreModelsSearchSearchMovieViewModel
} from '../../../ombi-api/model';
import { RequestStatus } from '../RequestStatus';
import { MovieRequest } from './MovieRequest';
import { shim, mst, action } from 'classy-mst';
import { merge } from '../../../utils/merge';
import { RootStore } from '../../RootStore';
import { Movie } from '../../media/movies/Movie';
import { api } from '../../../api';
import { ThenArg } from '../../../types/ThenArg';
import { TheMovieDbId } from '../../../types/ids';
import { RequestFilters } from '../../../types/RequestFilters';

function snapshotFromServerRequest(
  serverRequest: OmbiStoreEntitiesRequestsMovieRequests
) {
  let status = RequestStatus.Pending;
  if (serverRequest.approved) status = RequestStatus.Approved;
  else if (serverRequest.denied) status = RequestStatus.Denied;

  return {
    id: serverRequest.id,
    _movie: serverRequest.theMovieDbId,
    subscribed: serverRequest.subscribed,
    status,
    deniedReason: serverRequest.deniedReason,
    requestedBy: serverRequest.requestedUserId,
    requestedDate: new Date(serverRequest.requestedDate)
  } as SnapshotIn<typeof MovieRequest>;
}

function snapshotFromServerMovie(
  serverMovie: OmbiCoreModelsSearchSearchMovieViewModel
) {
  let status = undefined;
  if (serverMovie.approved) status = RequestStatus.Approved;
  else if (serverMovie.requested) status = RequestStatus.Pending;

  return {
    id: serverMovie.requestId,
    _movie: serverMovie.id,
    subscribed: serverMovie.subscribed,
    status
  } as SnapshotIn<typeof MovieRequest>;
}

const MovieRequestStoreData = types.model({
  movies: types.map(MovieRequest)
});

class MovieRequestStoreCode extends shim(MovieRequestStoreData) {
  @action
  update(patch: SnapshotIn<typeof MovieRequest>) {
    const existing = this.movies.get(patch.id.toString());

    if (existing) return merge(existing, patch);

    return this.movies.put(patch);
  }

  @action
  updateWithServerRequest(
    serverRequest: OmbiStoreEntitiesRequestsMovieRequests
  ) {
    const rootStore = getParentOfType(this, RootStore);

    if (serverRequest.requestedUser)
      rootStore.users.updateUserFromOmbiUser(serverRequest.requestedUser);

    rootStore.media.movies.updateFromServerRequest(serverRequest);

    const snapshot = snapshotFromServerRequest(serverRequest);
    return this.update(snapshot);
  }

  @action
  updateWithServerMovie(serverMovie: OmbiCoreModelsSearchSearchMovieViewModel) {
    const snapshot = snapshotFromServerMovie(serverMovie);
    return this.update(snapshot);
  }

  @action
  createRequest(movie: Instance<typeof Movie>, languageCode: string) {
    const self = this;

    return flow(function*() {
      const { data } = (yield api.requests.requestMoviePost(undefined, {
        theMovieDbId: movie.id,
        languageCode
      })) as ThenArg<typeof api.requests.requestMoviePost>;

      // This is ugly, but we still consider it a success.
      // If the movie was monitored but not requested, then a request now exists, which is subscribed to.
      if (data.isError && data.errorMessage !== 'Movie is already monitored')
        throw new Error(data.errorMessage);

      const request = (yield self.fetch(movie.title, movie.id)) as ThenArg<
        typeof self.fetch
      >;

      movie.setRequest(request);
    })();
  }

  // The api is stupid, you can't fetch a request direcly by its id, so instead we have two options:
  //  1) Fetch all and find it ourselves
  //  2) Search requests by movie title and hope for the best
  // I went with the second option, since it's most likely cheaper.
  @action
  fetch(movieTitle: string, movieId: TheMovieDbId) {
    const self = this;

    return flow(function*() {
      const {
        data: requests
      } = (yield api.requests.requestMovieSearchBySearchTermGet(
        movieTitle
      )) as ThenArg<typeof api.requests.requestMovieSearchBySearchTermGet>;

      if (!requests)
        throw new Error(`No requests matching title ${movieTitle}`);

      // we might as well cache all the results
      requests.forEach(self.updateWithServerRequest);

      const rightRequest = requests.find(r => r.theMovieDbId === movieId);

      if (!rightRequest)
        throw new Error(`No requests matching title ${movieTitle}`);

      return self.movies.get(rightRequest.id.toString());
    })();
  }

  @action
  fetchRequests(filter: RequestFilters) {
    const self = this;

    return flow(function*() {
      const { count, position, order, status, availability } = filter;
      const {
        data
      } = (yield api.requests.requestMovieByCountByPositionByOrderTypeByStatusTypeByAvailabilityTypeGet(
        count,
        position,
        order,
        status,
        availability
      )) as ThenArg<
        typeof api.requests.requestMovieByCountByPositionByOrderTypeByStatusTypeByAvailabilityTypeGet
      >;

      return data.collection.map(self.updateWithServerRequest);
    })();
  }
}

export const MovieRequestStore = mst(
  MovieRequestStoreCode,
  MovieRequestStoreData,
  'MovieRequestStore'
);
