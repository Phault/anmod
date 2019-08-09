import React, { useContext } from 'react';
import {
  DrawerItemsProps,
  ScrollView,
  SafeAreaView,
  DrawerItems
} from 'react-navigation';
import { Drawer } from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import { useStores } from '../../store/StoreContext';
import Constants from 'expo-constants';
import { UsernameLabel } from './UsernameLabel';

export const ContentComponent = (props: DrawerItemsProps) => {
  const { auth } = useStores();

  function signOut() {
    auth.signOut();
    props.navigation.navigate('Auth');
  }

  const theme = useContext(ThemeContext);

  return (
    <ScrollView
      alwaysBounceVertical={false}
      style={{
        backgroundColor: theme.colors.surface,
        paddingTop: Constants.statusBarHeight
      }}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <UsernameLabel />
        <DrawerItems {...props} />
        <Drawer.Item onPress={signOut} label="Sign out" />
      </SafeAreaView>
    </ScrollView>
  );
};
