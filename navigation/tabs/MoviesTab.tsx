import React from 'react';
import TabBarIcon from '../../components/TabBarIcon';
import { MoviesScreen } from '../../screens/movies/MoviesScreen';
import { MovieDetailsScreen } from '../../screens/movies/MovieDetailsScreen';
import { MovieSearchScreen } from '../../screens/movies/MovieSearchScreen';
import { createTab } from '../utils/createTab';

export const MoviesTab = createTab(
  {
    Movies: {
      screen: MoviesScreen,
      path: 'main'
    },
    Details: { screen: MovieDetailsScreen, path: 'details/:id' },
    Search: { screen: MovieSearchScreen, path: 'search/:term' }
  },
  {
    navigationOptions: {
      tabBarLabel: 'Movies',
      tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="movie" />
    }
  }
);
