import React, { useEffect } from 'react';
import { useStores } from '../store/StoreContext';
import { View } from 'react-native';

export const LoadingScreen = ({ navigation }) => {
  const { auth } = useStores();

  useEffect(() => {
    navigation.navigate(auth.isAuthenticated ? 'App' : 'Auth');
  }, []);

  return <View />;
};
