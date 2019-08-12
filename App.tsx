import AppNavigator from './navigation/AppNavigator';
import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  View,
  Platform,
  KeyboardAvoidingView,
  YellowBox,
  Linking
} from 'react-native';
import styled from 'styled-components/native';
import {
  ThemeProvider as StyledThemeProvider,
  DefaultTheme
} from 'styled-components';
import {
  Provider as PaperThemeProvider,
  DefaultTheme as PaperDefaultTheme,
  Theme as PaperTheme
} from 'react-native-paper';
import Axios from 'axios';
import { BASE_PATH } from './ombi-api/base';
import { RootStore } from './store/RootStore';
import { persist } from 'mst-persist';
import { StoreContext, useStores } from './store/StoreContext';
import { configure, autorun } from 'mobx';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from './NavigationService';
import initOneSignal from './initOneSignal';
import { useScreens } from 'react-native-screens';

StyleSheet.setStyleAttributePreprocessor('fontFamily', Font.processFontFamily);

YellowBox.ignoreWarnings([
  'Require cycle:',
  'Warning: ViewPagerAndroid has been extracted'
]);

useScreens();

configure({
  enforceActions: 'observed'
});

const store = RootStore.create({});
initOneSignal(store);

autorun(() => {
  if (store.auth.isAuthenticated) {
    store.users
      .fetchCurrentUser()
      .catch(e => console.warn(`Failed to fetch current user: ${e.message}`));
  }
});

const PersistGate = ({ children }) => {
  const store = useStores();
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    persist('data', store, {
      storage: AsyncStorage,
      whitelist: ['auth']
      // blacklist: ['search']
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  return <>{isLoaded ? children : null}</>;
};

Axios.interceptors.request.use(config => {
  const { serverUrl, accessToken } = store.auth;

  config.baseURL = serverUrl || undefined;
  config.url = config.url && config.url.replace(BASE_PATH, '');

  if (accessToken) config.headers['UserAccessToken'] = accessToken;

  return config;
});

export interface Theme extends DefaultTheme, PaperTheme {}

const defaultTheme: Theme = {
  ...PaperDefaultTheme,
  dark: true,
  roundness: 4,
  colors: {
    primary: '#DF691A',
    accent: '#5BC0DE',
    background: '#263238',
    surface: '#37474F',
    error: '#D9534F',
    text: '#ffffff',
    disabled: '#ffffff42',
    placeholder: '#ffffff8A',
    backdrop: '#00000080'
  }
};

const ThemeProvider = ({ theme, children }) => (
  <StyledThemeProvider theme={theme}>
    <PaperThemeProvider theme={theme}>{children}</PaperThemeProvider>
  </StyledThemeProvider>
);

const FillView = styled(View)`
  flex: 1;
`;

// const persistenceKey = 'navigation';

// const persistNavigationState = async navState => {
//   try {
//     await AsyncStorage.setItem(
//       persistenceKey,
//       JSON.stringify({ state: navState, time: Date.now() })
//     );
//   } catch (err) {
//     // handle the error according to your needs
//   }
// };

// const OneDay = 1000 * 60 * 60 * 24;
// const loadNavigationState = async () => {
//   const jsonString = await AsyncStorage.getItem(persistenceKey);
//   const state = JSON.parse(jsonString);

//   if (state.time > Date.now() - OneDay) return state;
// };

const uriPrefix = 'anmod://';

const urlHandler = ({ url }) => {
  const match = /themoviedb\.org\/(movie|tv)\/(\d+)/i.exec(url);

  if (match) {
    const type = match[1];
    const id = match[2];

    if (type === 'movie') Linking.openURL(`${uriPrefix}movies/details/${id}`);
    else Linking.openURL(`${uriPrefix}shows/details/${id}`);
  }
};

Linking.addEventListener('url', urlHandler);
Linking.getInitialURL().then(url => urlHandler({ url }));

export default function App() {
  return (
    <StoreContext.Provider value={store}>
      <PersistGate>
        <ThemeProvider theme={defaultTheme}>
          <FillView style={{ backgroundColor: defaultTheme.colors.background }}>
            <StatusBar
              backgroundColor="transparent"
              barStyle={defaultTheme.dark ? 'light-content' : 'dark-content'}
              translucent
            />
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1 }}
              enabled={Platform.OS === 'ios'}>
              <AppNavigator
                ref={ref => NavigationService.setTopLevelNavigator(ref)}
                screenProps={{ theme: defaultTheme }}
                uriPrefix={uriPrefix}
                // persistNavigationState={persistNavigationState}
                // loadNavigationState={loadNavigationState}
              />
            </KeyboardAvoidingView>
          </FillView>
        </ThemeProvider>
      </PersistGate>
    </StoreContext.Provider>
  );
}
