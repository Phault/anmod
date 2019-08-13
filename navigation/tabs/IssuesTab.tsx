import React from 'react';
import TabBarIcon from '../../components/TabBarIcon';
import { createTab, defaultHeaderStyle } from '../utils/createTab';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { PendingIssuesScreen } from '../../screens/issues/PendingIssuesScreen';
import { ThemedTopTabBar } from './RequestsTab';
import { ResolvedIssuesScreen } from '../../screens/issues/ResolvedIssuesScreen';
import { InProgressIssuesScreen } from '../../screens/issues/InProgressIssuesScreen';

export const IssuesTabNavigator = createMaterialTopTabNavigator(
  {
    Pending: {
      screen: PendingIssuesScreen,
      path: 'pending'
    },
    InProgress: {
      screen: InProgressIssuesScreen,
      path: 'inprogress'
    },
    Resolved: {
      screen: ResolvedIssuesScreen,
      path: 'resolved'
    }
  },
  {
    navigationOptions: params => ({
      title: 'Issues',
      headerStyle: {
        ...defaultHeaderStyle(params),
        elevation: 0
      }
    }),
    tabBarComponent: ThemedTopTabBar
  }
);

export const IssuesTab = createTab(
  {
    Issues: IssuesTabNavigator
  },
  {
    navigationOptions: {
      tabBarLabel: 'Issues',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name="bug-report" />
      )
    }
  }
);
