import React from 'react';
import TabBarIcon from '../../components/TabBarIcon';
import { createTab } from '../utils/createTab';

export const IssuesTab = createTab(
  {
    // Issues: IssuesScreen
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
