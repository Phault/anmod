import { types, getParentOfType } from 'mobx-state-tree';
import { User } from '../../users/User';
import { SeasonRequest } from './SeasonRequest';
import { RequestStatusType, RequestStatus } from '../RequestStatus';

export const ShowChildRequest = types
  .model('ShowChildRequest', {
    id: types.identifierNumber,
    seasonRequests: types.array(SeasonRequest),
    requestedBy: types.reference(User),
    requestedDate: types.Date,
    status: RequestStatusType
  })
  .views(self => ({
    get episodeCount() {
      return self.seasonRequests.reduce(
        (count, request) => count + request.episodes.length,
        0
      );
    },

    get seasonCount() {
      return self.seasonRequests.length;
    }
  }));
