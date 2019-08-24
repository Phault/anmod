import { types } from 'mobx-state-tree';
import { MediaStore } from './media/MediaStore';
import { RequestStore } from './requests/RequestStore';
import { IssueStore } from './issues/IssueStore';
import { UserStore } from './users/UserStore';
import { AuthStore } from './AuthStore';
import { ListStore } from './ListStore';

export const RootStore = types.model('RootStore', {
  auth: types.optional(AuthStore, {}),
  media: types.optional(MediaStore, {}),
  requests: types.optional(RequestStore, {}),
  issues: types.optional(IssueStore, {}),
  users: types.optional(UserStore, {}),
  lists: types.optional(ListStore, {})
});
