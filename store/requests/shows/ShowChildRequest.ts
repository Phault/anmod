import { types } from 'mobx-state-tree';
import { User } from '../../users/User';
import { SeasonRequest } from './SeasonRequest';
import { RequestStatusType } from '../RequestStatus';

export const ShowChildRequest = types.model('ShowChildRequest', {
  id: types.identifierNumber,
  seasonRequests: types.array(SeasonRequest),
  requestedBy: types.reference(User),
  requestedDate: types.Date,
  status: RequestStatusType
});
