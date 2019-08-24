import {
  SearchApi,
  RequestApi,
  IdentityApi,
  TokenApi,
  SettingsApi,
  IssuesApi,
  StatusApi,
  ImagesApi
} from './ombi-api';
import Axios from 'axios';

const search = new SearchApi();

const movieLists = {
  popular: search.searchMoviePopularGet,
  upcoming: search.searchMovieUpcomingGet,
  toprated: search.searchMovieTopratedGet,
  nowplaying: search.searchMovieNowplayingGet
};

const showLists = {
  popular: search.searchTvPopularGet,
  trending: search.searchTvTrendingGet,
  anticipated: search.searchTvAnticipatedGet,
  mostwatched: search.searchTvMostwatchedGet
};

export type MovieLists = keyof typeof movieLists;
export type ShowLists = keyof typeof showLists;

function getMovieList(list: MovieLists) {
  const fetcher = movieLists[list];

  if (!fetcher) throw new Error(`list '${list}' is invalid`);

  return fetcher();
}

function getShowList(list: ShowLists) {
  const fetcher = showLists[list];

  if (!fetcher) throw new Error(`list '${list}' is invalid`);

  return fetcher();
}

async function testServer(serverUrl: string, timeout: number = 2000) {
  const statusApi = new StatusApi({
    basePath: serverUrl,
    baseOptions: {
      timeout
    }
  });

  const response = await statusApi.statusGet();

  if (typeof response.data !== 'number' || response.data !== 200)
    throw new Error('Server did not respond properly');
}

export interface NotificationIdBody {
  playerId: string;
}

export interface MobileUser {
  userId: string;
  username: string;
  devices: number;
}

export class MobileApi {
  basePath = '/api/v1/mobile/';

  addNotificationId(playerId: string) {
    return Axios.post(`${this.basePath}Notification`, {
      playerId
    });
  }

  getRegisteredMobileUsers() {
    return Axios.get<MobileUser[]>(`${this.basePath}Notification`);
  }

  removeUser(userId: string) {
    return Axios.post<boolean>(this.basePath, {
      userId
    });
  }
}

export const api = {
  search,
  requests: new RequestApi(),
  identity: new IdentityApi(),
  token: new TokenApi(),
  settings: new SettingsApi(),
  issues: new IssuesApi(),
  mobile: new MobileApi(),
  images: new ImagesApi(),
  lists: {
    getMovieList,
    getShowList
  },
  testServer
};
