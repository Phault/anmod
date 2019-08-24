import Axios from 'axios';
import { BASE_PATH } from './ombi-api/base';
import { RootStore } from './store/RootStore';
import { Instance } from 'mobx-state-tree';

export function initAxios(store: Instance<typeof RootStore>) {
  Axios.interceptors.request.use(config => {
    const { serverUrl, accessToken } = store.auth;

    config.baseURL = serverUrl || undefined;
    config.url = config.url && config.url.replace(BASE_PATH, '');

    if (accessToken) config.headers['UserAccessToken'] = accessToken;

    return config;
  });
}
