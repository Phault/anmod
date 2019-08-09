import React from 'react';
import TabBarIcon from '../../components/TabBarIcon';
import { MovieList } from '../../components/MovieList';
import { createTab } from '../utils/createTab';

export const IssuesTab = createTab(
  {
    Issues: MovieList
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
