import React from 'react';
import TabBarIcon from '../../components/TabBarIcon';
import { createTab, defaultHeaderStyle } from '../utils/createTab';
import { PendingRequestsScreen } from '../../screens/requests/PendingRequestsScreen';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar
} from 'react-navigation';
import styled from 'styled-components/native';
import { HistoryRequestsScreen } from '../../screens/requests/HistoryRequestsScreen';

export const ThemedTopTabBar = styled(MaterialTopTabBar).attrs(props => ({
  activeTintColor: props.theme.colors.primary,
  pressColor: props.theme.colors.primary,
  indicatorStyle: {
    backgroundColor: props.theme.colors.primary
  }
}))`
  background: ${props => props.theme.colors.surface};
`;

export const RequestsTabNavigator = createMaterialTopTabNavigator(
  {
    Pending: {
      screen: PendingRequestsScreen,
      path: 'pending'
    },
    History: {
      screen: HistoryRequestsScreen,
      path: 'history'
    }
  },
  {
    navigationOptions: params => ({
      title: 'Requests',
      headerStyle: {
        ...defaultHeaderStyle(params),
        elevation: 0
      }
    }),
    tabBarComponent: ThemedTopTabBar
  }
);

export const RequestsTab = createTab(
  {
    Requests: RequestsTabNavigator
  },
  {
    navigationOptions: {
      tabBarLabel: 'Requests',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name="assignment" />
      )
    }
  }
);
