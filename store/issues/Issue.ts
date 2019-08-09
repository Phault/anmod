import { types } from 'mobx-state-tree';
import { OmbiStoreEntitiesRequestsIssuesStatusEnum } from '../../ombi-api/model';
import { User } from '../users/User';
import { IssueComment } from './IssueComment';
import { IssueStatus } from './IssueStatus';
import { RequestType } from '../requests/RequestType';

export const Issue = types.model('Issue', {
  id: types.identifier,
  subject: '',
  description: '',
  status: types.optional(
    IssueStatus,
    OmbiStoreEntitiesRequestsIssuesStatusEnum.Pending
  ),
  requestType: RequestType,
  // requestId: types.integer,
  mediaId: types.string,
  author: types.reference(User),
  comments: types.map(IssueComment)
});
