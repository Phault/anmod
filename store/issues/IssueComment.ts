import { types } from 'mobx-state-tree';
import { User } from '../users/User';

export const IssueComment = types.model('IssueComment', {
  comment: types.string,
  author: types.reference(User),
  date: types.Date
});
