import { types, SnapshotIn, flow } from 'mobx-state-tree';
import { User } from './User';
import {
  OmbiStoreEntitiesOmbiUser,
  OmbiCoreModelsUIUserViewModel
} from '../../ombi-api/model';
import { merge } from '../../utils/merge';
import { shim, action, mst } from 'classy-mst';
import { api } from '../../api';
import { ThenArg } from '../../types/ThenArg';
import { OmbiCoreModelsRequestQuotaCountModel } from '../../ombi-api/model/ombi-core-models-request-quota-count-model';
import { RequestQuota } from './RequestQuota';
import { fromEntries } from '../../utils/fromEntries';

function userSnapshotFromOmbiUser(serverUser: OmbiStoreEntitiesOmbiUser) {
  const snapshot: SnapshotIn<typeof User> = {
    id: serverUser.id,
    username: serverUser.userName,
    alias: serverUser.alias,
    email: serverUser.email
  };

  return snapshot;
}

function requestQuotaFromServer(quota: OmbiCoreModelsRequestQuotaCountModel) {
  if (quota === null) return undefined;

  const snapshot: SnapshotIn<typeof RequestQuota> = {
    limit: quota.limit,
    remaining: quota.remaining,
    nextRequest: new Date(quota.nextRequest)
  };

  return snapshot;
}

function userSnapshotFromViewModel(serverUser: OmbiCoreModelsUIUserViewModel) {
  const snapshot: SnapshotIn<typeof User> = {
    id: serverUser.id,
    username: serverUser.userName,
    alias: serverUser.alias,
    email: serverUser.emailAddress,
    claims: fromEntries(serverUser.claims.map(c => [c.value, c.enabled])),
    movieRequestQuota: requestQuotaFromServer(serverUser.movieRequestQuota),
    episodeRequestQuota: requestQuotaFromServer(serverUser.episodeRequestQuota),
    musicRequestQuota: requestQuotaFromServer(serverUser.musicRequestQuota)
  };

  return snapshot;
}

const UserStoreData = types.model({
  users: types.map(User),
  currentUser: types.maybeNull(types.reference(User))
});

class UserStoreCode extends shim(UserStoreData) {
  @action
  fetchCurrentUser() {
    const self = this;

    return flow(function*() {
      const {
        data: serverUser
      } = (yield api.identity.identityGet()) as ThenArg<
        typeof api.identity.identityGet
      >;

      self.currentUser = self.updateUserFromViewModel(serverUser);
      return self.currentUser;
    })();
  }

  @action
  updateUser(patch: SnapshotIn<typeof User>) {
    const existingUser = this.users.get(patch.id.toString());
    if (existingUser) merge(existingUser, patch);

    return existingUser || this.users.put(patch);
  }

  @action
  updateUserFromOmbiUser(serverUser: OmbiStoreEntitiesOmbiUser) {
    const userSnapshot = userSnapshotFromOmbiUser(serverUser);
    return this.updateUser(userSnapshot);
  }

  @action
  updateUserFromViewModel(serverUser: OmbiCoreModelsUIUserViewModel) {
    const userSnapshot = userSnapshotFromViewModel(serverUser);
    return this.updateUser(userSnapshot);
  }
}

export const UserStore = mst(UserStoreCode, UserStoreData, 'UserStore');
