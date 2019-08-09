import React from 'react';
import TabBarIcon from '../../components/TabBarIcon';
import { MovieList } from '../../components/MovieList';
import { createTab } from '../utils/createTab';

export const RequestsTab = createTab(
  {
    Requests: MovieList
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
