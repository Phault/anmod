import {
  types,
  Instance,
  getParentOfType,
  SnapshotIn,
  flow
} from 'mobx-state-tree';
import { Issue } from './Issue';
import { IssueCategory } from './IssueCategory';
import { RootStore } from '../RootStore';
import { shim, mst, action } from 'classy-mst';
import { MovieRequest } from '../requests/movies/MovieRequest';
import { merge } from '../../utils/merge';
import { OmbiStoreEntitiesRequestsIssues } from '../../ombi-api/model/ombi-store-entities-requests-issues';
import { api } from '../../api';
import { IssueFilters } from '../../types/IssueFilters';
import { ThenArg } from '../../types/ThenArg';
import { IssueStatus } from '../../types/IssueStatus';
import { RequestType } from '../../types/RequestType';
import { $enum } from 'ts-enum-util';
import uniqBy from 'lodash.uniqby';

function issueSnapshotFromServerIssue(
  serverIssue: OmbiStoreEntitiesRequestsIssues
) {
  const snapshot: SnapshotIn<typeof Issue> = {
    id: serverIssue.id,
    author: serverIssue.userReportedId,
    subject: serverIssue.subject,
    description: serverIssue.description,
    category: serverIssue.issueCategoryId,
    mediaId: serverIssue.providerId,
    mediaType: $enum(RequestType).getKeyOrThrow(
      (serverIssue.requestType as unknown) as number
    ),
    status: $enum(IssueStatus).getKeyOrThrow(
      (serverIssue.status as unknown) as number
    )
  };

  return snapshot;
}

const IssueStoreData = types.model({
  issues: types.map(Issue),
  categories: types.map(IssueCategory)
});

class IssueStoreCode extends shim(IssueStoreData) {
  get mine() {
    const user = getParentOfType(this, RootStore).users.currentUser;

    return Object.values(this.issues).filter(
      (i: Instance<typeof Issue>) => i.author === user
    ) as Instance<typeof Issue>[];
  }

  @action
  updateIssue(patch: SnapshotIn<typeof MovieRequest>) {
    const existing = this.issues.get(patch.id.toString());

    if (existing) return merge(existing, patch);

    return this.issues.put(patch);
  }

  @action
  updateIssueWithServerIssue(serverIssue: OmbiStoreEntitiesRequestsIssues) {
    if (serverIssue.userReported) {
      const rootStore = getParentOfType(this, RootStore);
      rootStore.users.updateUserFromOmbiUser(serverIssue.userReported);
    }

    this.updateIssueCategory(serverIssue.issueCategory);

    const snapshot = issueSnapshotFromServerIssue(serverIssue);
    return this.updateIssue(snapshot);
  }

  @action
  updateIssueCategory(patch: SnapshotIn<typeof IssueCategory>) {
    const existing = this.categories.get(patch.id.toString());

    if (existing) return merge(existing, patch);

    return this.categories.put(patch);
  }

  @action
  fetchIssues(filter: IssueFilters) {
    const self = this;

    return flow(function*() {
      const { data } = (yield api.issues.issuesByTakeBySkipByStatusGet(
        filter.count,
        filter.position,
        $enum(IssueStatus).getKeyOrThrow(filter.status)
      )) as ThenArg<typeof api.issues.issuesByTakeBySkipByStatusGet>;

      const mediaStore = getParentOfType(self, RootStore).media;

      yield Promise.all(
        uniqBy(data, i => i.providerId).map(issue => {
          const id = parseInt(issue.providerId);
          const type = (issue.requestType as unknown) as RequestType;

          const existing = mediaStore.get(id, type);

          if (existing) return Promise.resolve(existing);

          return mediaStore.fetch(id, type);
        })
      );

      return data.map(self.updateIssueWithServerIssue);
    })();
  }
}

export const IssueStore = mst(IssueStoreCode, IssueStoreData, 'IssueStore');
