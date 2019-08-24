import { types, SnapshotIn, getParentOfType, flow } from 'mobx-state-tree';
import { shim, mst, action } from 'classy-mst';
import { ShowRequest } from './ShowRequest';
import {
  OmbiStoreEntitiesRequestsTvRequests,
  OmbiStoreRepositoryRequestsSeasonRequests,
  OmbiStoreRepositoryRequestsEpisodeRequests
} from '../../../ombi-api/model';
import { RequestStatus } from '../RequestStatus';
import { merge } from '../../../utils/merge';
import { RootStore } from '../../RootStore';
import { OmbiStoreEntitiesRequestsChildRequests } from '../../../ombi-api/model/ombi-store-entities-requests-child-requests';
import { ShowChildRequest } from './ShowChildRequest';
import { EpisodeRequest } from './EpisodeRequest';
import { SeasonRequest } from './SeasonRequest';
import { RequestFilters } from '../../../types/RequestFilters';
import { api } from '../../../api';
import { ThenArg } from '../../../types/ThenArg';
import { TheTvDbId } from '../../../types/ids';

function episodeRequestSnapshotFromServer(
  serverEpisodeRequest: OmbiStoreRepositoryRequestsEpisodeRequests
) {
  return {
    id: serverEpisodeRequest.id,
    episodeNumber: serverEpisodeRequest.episodeNumber
  } as SnapshotIn<typeof EpisodeRequest>;
}

function seasonRequestSnapshotFromServer(
  serverSeasonRequest: OmbiStoreRepositoryRequestsSeasonRequests
) {
  return {
    id: serverSeasonRequest.id,
    seasonNumber: serverSeasonRequest.seasonNumber,
    episodes: serverSeasonRequest.episodes.map(episodeRequestSnapshotFromServer)
  } as SnapshotIn<typeof SeasonRequest>;
}

function childRequestSnapshotFromServer(
  serverChildRequest: OmbiStoreEntitiesRequestsChildRequests
) {
  let status = RequestStatus.Pending;
  if (serverChildRequest.approved) status = RequestStatus.Approved;
  else if (serverChildRequest.denied) status = RequestStatus.Denied;

  return {
    id: serverChildRequest.id,
    status,
    seasonRequests: serverChildRequest.seasonRequests.map(
      seasonRequestSnapshotFromServer
    ),
    requestedBy: serverChildRequest.requestedUserId,
    requestedDate: new Date(serverChildRequest.requestedDate)
  } as SnapshotIn<typeof ShowChildRequest>;
}

function snapshotFromServerRequest(
  serverRequest: OmbiStoreEntitiesRequestsTvRequests
) {
  return {
    id: serverRequest.id,
    _show: serverRequest.tvDbId,
    qualityOverride: serverRequest.qualityOverride,
    rootFolder: serverRequest.rootFolder,
    childRequests: serverRequest.childRequests.map(
      childRequestSnapshotFromServer
    ),
    lastUpdated: new Date()
  } as SnapshotIn<typeof ShowRequest>;
}

const ShowRequestStoreData = types.model({
  shows: types.map(ShowRequest)
});

class ShowRequestStoreCode extends shim(ShowRequestStoreData) {
  @action
  update(patch: SnapshotIn<typeof ShowRequest>) {
    const existing = this.shows.get(patch.id.toString());

    if (existing) return merge(existing, patch);

    return this.shows.put(patch);
  }

  @action
  updateWithServerRequest(serverRequest: OmbiStoreEntitiesRequestsTvRequests) {
    const rootStore = getParentOfType(this, RootStore);
    serverRequest.childRequests.forEach(cr => {
      rootStore.users.updateUserFromOmbiUser(cr.requestedUser);
    });

    rootStore.media.shows.updateFromServerRequest(serverRequest);

    const snapshot = snapshotFromServerRequest(serverRequest);
    return this.update(snapshot);
  }

  // The api is still stupid, you don't get the request id from the search api. unlike with the movie search api
  // But this time you CAN fetch a request directly by its id...
  // Same workaround though: search requests by title and match by show ID.
  @action
  fetch(showTitle: string, showId: TheTvDbId) {
    const self = this;

    return flow(function*() {
      const {
        data: requests
      } = (yield api.requests.requestTvSearchBySearchTermGet(
        showTitle
      )) as ThenArg<typeof api.requests.requestTvSearchBySearchTermGet>;

      if (!requests) return null;

      // we might as well cache all the results
      requests.forEach(self.updateWithServerRequest);

      const rightRequest = requests.find(r => r.tvDbId === showId);

      if (!rightRequest) return null;

      return self.shows.get(rightRequest.id.toString());
    })();
  }

  @action
  fetchRequests(filter: RequestFilters) {
    const self = this;

    return flow(function*() {
      const { count, position, order, status, availability } = filter;
      const {
        data
      } = (yield api.requests.requestTvByCountByPositionByOrderTypeByStatusFilterTypeByAvailabilityFilterTypeGet(
        count,
        position,
        order,
        status as any, // the generated api is so broken
        availability as any
      )) as ThenArg<
        typeof api.requests.requestTvByCountByPositionByOrderTypeByStatusFilterTypeByAvailabilityFilterTypeGet
      >;

      return data.collection.map(self.updateWithServerRequest);
    })();
  }
}

export const ShowRequestStore = mst(
  ShowRequestStoreCode,
  ShowRequestStoreData,
  'ShowRequestStore'
);
