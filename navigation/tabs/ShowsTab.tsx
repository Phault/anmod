import React from 'react';
import TabBarIcon from '../../components/TabBarIcon';
import { createTab } from '../utils/createTab';
import { ShowSearchScreen } from '../../screens/shows/ShowSearchScreen';
import { ShowsScreen } from '../../screens/shows/ShowsScreen';
import { ShowDetailsScreen } from '../../screens/shows/ShowDetailsScreen';

export const ShowsTab = createTab(
  {
    Movies: {
      screen: ShowsScreen,
      path: 'main'
    },
    Details: { screen: ShowDetailsScreen, path: 'details/:id' },
    Search: { screen: ShowSearchScreen, path: 'search/:term' }
  },
  {
    navigationOptions: {
      tabBarLabel: 'Shows',
      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="tv" />
    }
  }
);
