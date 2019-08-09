import {
  types,
  Instance,
  SnapshotIn,
  flow,
  getParentOfType
} from 'mobx-state-tree';
import { values, runInAction } from 'mobx';
import { RequestStatus } from './RequestStatus';
import { ShowRequest } from './shows/ShowRequest';
import { MovieRequest } from './movies/MovieRequest';
import {
  OmbiCoreModelsSearchSearchMovieViewModel,
  OmbiStoreEntitiesRequestsMovieRequests
} from '../../ombi-api/model';
import { shim, action, mst } from 'classy-mst';
import { ThenArg } from '../../types/ThenArg';
import { api } from '../../api';
import { Movie } from '../media/Movie';
import { merge } from '../../utils/merge';
import { RootStore } from '../RootStore';

function movieRequestSnapshotFromServerRequest(
  serverRequest: OmbiStoreEntitiesRequestsMovieRequests
) {
  let status = RequestStatus.Pending;
  if (serverRequest.approved) status = RequestStatus.Approved;
  else if (serverRequest.denied) status = RequestStatus.Denied;

  const snapshot: SnapshotIn<typeof MovieRequest> = {
    id: serverRequest.id,
    _movie: serverRequest.theMovieDbId,
    subscribed: serverRequest.subscribed,
    status,
    deniedReason: serverRequest.deniedReason,
    requestedBy: serverRequest.requestedUserId,
    requestedDate: new Date(serverRequest.requestedDate)
  };

  return snapshot;
}

function movieRequestSnapshotFromServerMovie(
  serverMovie: OmbiCoreModelsSearchSearchMovieViewModel
) {
  let status = undefined;
  if (serverMovie.approved) status = RequestStatus.Approved;
  else if (serverMovie.requested) status = RequestStatus.Pending;

  const snapshot: SnapshotIn<typeof MovieRequest> = {
    id: serverMovie.requestId,
    _movie: serverMovie.id,
    subscribed: serverMovie.subscribed,
    status
  };

  return snapshot;
}

const RequestStoreData = types.model({
  movies: types.map(MovieRequest),
  shows: types.map(ShowRequest)
});

class RequestStoreCode extends shim(RequestStoreData) {
  moviesWithStatus(status: RequestStatus) {
    return values(this.movies).filter(m => m.status === status) as Instance<
      typeof MovieRequest
    >[];
  }

  @action
  updateMovieRequest(patch: SnapshotIn<typeof MovieRequest>) {
    const existing = this.movies.get(patch.id.toString());

    if (existing) return merge(existing, patch);

    return this.movies.put(patch);
  }

  @action
  updateMovieRequestWithServerRequest(
    serverRequest: OmbiStoreEntitiesRequestsMovieRequests
  ) {
    if (serverRequest.requestedUser) {
      const rootStore = getParentOfType(this, RootStore);
      rootStore.users.updateUserFromOmbiUser(serverRequest.requestedUser);
    }

    const snapshot = movieRequestSnapshotFromServerRequest(serverRequest);
    return this.updateMovieRequest(snapshot);
  }

  @action
  updateMovieRequestWithServerMovie(
    serverMovie: OmbiCoreModelsSearchSearchMovieViewModel
  ) {
    const snapshot = movieRequestSnapshotFromServerMovie(serverMovie);
    return this.updateMovieRequest(snapshot);
  }

  @action
  createMovieRequest(movie: Instance<typeof Movie>, languageCode: string) {
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

      const request = (yield self.fetchMovieRequest(movie.title)) as ThenArg<
        typeof self.fetchMovieRequest
      >;

      movie.setRequest(request);
    })();
  }

  // The api is stupid, you can't fetch a request direcly by its id, so instead we have two options:
  //  1) Fetch all and find it ourselves
  //  2) Search requests by movie title and hope for the best
  // I went with the second option, since it's most likely cheaper.
  @action
  fetchMovieRequest(movieTitle: string) {
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
      requests.forEach(self.updateMovieRequestWithServerRequest);

      const rightRequest = requests.find(r => r.title === movieTitle);

      if (!rightRequest)
        throw new Error(`No requests matching title ${movieTitle}`);

      return self.movies.get(rightRequest.id.toString());
    })();
  }
}

export const RequestStore = mst(
  RequestStoreCode,
  RequestStoreData,
  'RequestStore'
);
