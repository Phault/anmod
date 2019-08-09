import React from 'react';
import TabBarIcon from '../../components/TabBarIcon';
import { MoviesScreen } from '../../screens/movies/MoviesScreen';
import { MovieDetailsScreen } from '../../screens/movies/MovieDetailsScreen';
import { createTab } from '../utils/createTab';

export const MusicTab = createTab(
  {
    Music: MoviesScreen,
    Details: MovieDetailsScreen
  },
  {
    navigationOptions: {
      tabBarLabel: 'Music',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name="audiotrack" />
      )
    }
  }
);
