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
import { RootStore } from './store/RootStore';
import { persist } from 'mst-persist';
import { StoreContext, useStores } from './store/StoreContext';
import { configure as configureMobx, autorun } from 'mobx';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-community/async-storage';
import initOneSignal from './initOneSignal';
import { useScreens } from 'react-native-screens';
import { ThemeProvider, defaultTheme } from './Theme';
import { initAxios } from './initAxios';

StyleSheet.setStyleAttributePreprocessor('fontFamily', Font.processFontFamily);

YellowBox.ignoreWarnings([
  'Require cycle:',
  'Warning: ViewPagerAndroid has been extracted'
]);

useScreens();

configureMobx({
  enforceActions: 'observed'
});

export const store = RootStore.create({});
initOneSignal(store);
initAxios(store);

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

  return isLoaded ? children : null;
};

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
          <View
            style={[
              styles.fill,
              { backgroundColor: defaultTheme.colors.background }
            ]}>
            <StatusBar
              backgroundColor="transparent"
              barStyle={defaultTheme.dark ? 'light-content' : 'dark-content'}
              translucent
            />
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.fill}
              enabled={Platform.OS === 'ios'}>
              <AppNavigator
                screenProps={{ theme: defaultTheme }}
                uriPrefix={uriPrefix}
                // persistNavigationState={persistNavigationState}
                // loadNavigationState={loadNavigationState}
              />
            </KeyboardAvoidingView>
          </View>
        </ThemeProvider>
      </PersistGate>
    </StoreContext.Provider>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  }
});
