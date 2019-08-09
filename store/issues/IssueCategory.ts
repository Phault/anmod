import { types } from 'mobx-state-tree';

export const IssueCategory = types.model('IssueCategory', {
  id: types.identifierNumber,
  value: types.string
});
