import { Platform } from 'react-native';
import Axios from 'axios';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { api } from '../api';

export interface OmbiToken {
  access_token: string;
  expiration: string;
}

export interface IPlexPin {
  id: number;
  code: string;
}

export async function signIn(username: string, password: string) {
  const ombiToken = ((await api.token.tokenPost(undefined, {
    username,
    password,
    rememberMe: true
  })).data as unknown) as OmbiToken;

  return await getUserAccessToken(ombiToken.access_token);
}

export async function signInPlex() {
  const clientId = (await api.settings.settingsClientidGet()).data;
  const plexTvPin = (await createPlexPin(clientId)).data;

  const loginResult = (await api.token.tokenPost(null, {
    usePlexOAuth: true,
    rememberMe: true,
    plexTvPin
  })).data;

  await WebBrowser.openAuthSessionAsync(
    encodeURI(loginResult.url),
    Constants.linkingUri
  );

  const tokenRequest = await api.token.tokenByPinIdGet(plexTvPin.id);

  if ('errorMessage' in tokenRequest.data)
    throw new Error(tokenRequest.data['errorMessage']);

  // the generated api is awful..
  const token = (tokenRequest.data as unknown) as OmbiToken;

  return await getUserAccessToken(token.access_token);
}

function createPlexPin(clientId: string) {
  return Axios.post<IPlexPin>('https://plex.tv/api/v2/pins?strong=true', null, {
    headers: {
      'Content-Type': 'application/json',
      'X-Plex-Client-Identifier': clientId,
      'X-Plex-Product': 'Anmod',
      'X-Plex-Version': '3',
      'X-Plex-Device': `${Constants.deviceName} (${Platform.OS})`,
      'X-Plex-Platform': Platform.OS,
      Accept: 'application/json'
    }
  });
}

// regular tokens expire and refreshing is not supported,
// instead a "UserAccessToken" is used in the official Ombi app
// which is retrieved with a hidden api call
async function getUserAccessToken(accessToken: string) {
  const response = await Axios.get<string>(`/api/v1/Identity/accesstoken`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data;
}
