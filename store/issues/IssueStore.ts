import { types, Instance, getParentOfType } from 'mobx-state-tree';
import { Issue } from './Issue';
import { IssueCategory } from './IssueCategory';
import { RootStore } from '../RootStore';
import { values } from 'mobx';

export const IssueStore = types
  .model('IssueStore', {
    issues: types.map(Issue),
    categories: types.map(IssueCategory)
  })
  .views(self => ({
    get mine() {
      const user = getParentOfType(self, RootStore).auth.user;

      return values(self.issues).filter(
        (i: Instance<typeof Issue>) => i.author === user
      ) as Instance<typeof Issue>[];
    }
  }));
