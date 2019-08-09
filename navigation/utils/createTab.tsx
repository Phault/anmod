import React from 'react';
import {
  createStackNavigator,
  getActiveChildNavigationOptions,
  NavigationRouteConfigMap,
  StackNavigatorConfig,
  NavigationContainer,
  Header
} from 'react-navigation';
import Constants from 'expo-constants';
import { ThemedAppbarBackAction } from '../../components/drawer/ThemedAppbarBackAction';
import { ThemedAppbarAction } from '../../components/drawer/ThemedAppbarAction';

export function createTab(
  routeConfigMap: NavigationRouteConfigMap,
  options: StackNavigatorConfig
): NavigationContainer {
  return createStackNavigator(routeConfigMap, {
    ...options,

    defaultNavigationOptions: params => ({
      headerLeft: (props: any) =>
        props.scene.index !== 0 ? (
          <ThemedAppbarBackAction onPress={() => params.navigation.goBack()} />
        ) : (
          <ThemedAppbarAction
            icon="menu"
            onPress={() => params.navigation.toggleDrawer()}
          />
        ),
      headerStyle: {
        backgroundColor: params.screenProps.theme.colors.surface,
        height: Constants.statusBarHeight + Header.HEIGHT,
        paddingTop: Constants.statusBarHeight
      },
      headerTintColor: params.screenProps.theme.colors.text,
      ...(typeof options.defaultNavigationOptions === 'function'
        ? options.defaultNavigationOptions(params)
        : options.defaultNavigationOptions)
    }),

    navigationOptions: params => {
      const childOptions = getActiveChildNavigationOptions(
        params.navigation,
        params.screenProps
      );

      return {
        ...(typeof options.navigationOptions === 'function'
          ? options.navigationOptions(params)
          : options.navigationOptions),
        ...childOptions
      };
    }
  });
}
