import { types, flow } from 'mobx-state-tree';
import { User } from './users/User';
import { shim, action, mst } from 'classy-mst';
import { signIn, signInPlex } from '../AuthHelpers';

const AuthStoreData = types.model('AuthStore', {
  serverUrl: types.maybeNull(types.string),
  accessToken: types.maybeNull(types.string)
});

class AuthStoreCode extends shim(AuthStoreData) {
  get isAuthenticated() {
    return !!(this.serverUrl && this.accessToken);
  }

  @action
  setServerUrl(serverUrl: string) {
    this.serverUrl = serverUrl;
  }

  @action
  signIn(username: string, password: string) {
    const self = this;
    return flow(function*() {
      const accessToken = yield signIn(username, password);
      self.accessToken = accessToken;
    })();
  }

  @action
  signInWithPlex() {
    const self = this;
    return flow(function*() {
      const accessToken = yield signInPlex();
      self.accessToken = accessToken;
    })();
  }

  @action
  signOut() {
    this.accessToken = null;
  }
}

export const AuthStore = mst(AuthStoreCode, AuthStoreData, 'AuthStore');
