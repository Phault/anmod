import React from 'react';
import TabBarIcon from '../../components/TabBarIcon';
import { MoviesScreen } from '../../screens/movies/MoviesScreen';
import { MovieDetailsScreen } from '../../screens/movies/MovieDetailsScreen';
import { createTab } from '../utils/createTab';

export const ShowsTab = createTab(
  {
    Shows: MoviesScreen,
    Details: MovieDetailsScreen
  },
  {
    navigationOptions: {
      tabBarLabel: 'Shows',
      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="tv" />
    }
  }
);
