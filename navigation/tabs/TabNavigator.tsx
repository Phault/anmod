import {
  getActiveChildNavigationOptions,
  createBottomTabNavigator
} from 'react-navigation';

import { MoviesTab } from './MoviesTab';
import { ThemedTabBar } from '../../components/ThemedTabBar';
import { RequestsTab } from './RequestsTab';

export default createBottomTabNavigator(
  {
    MoviesTab: {
      screen: MoviesTab,
      path: 'movies'
    },
    RequestsTab: {
      screen: RequestsTab,
      path: 'requests'
    }
  },
  {
    tabBarComponent: ThemedTabBar,
    navigationOptions: ({ navigation, screenProps }) => {
      const childOptions = getActiveChildNavigationOptions(
        navigation,
        screenProps
      );

      return {
        headerTitle: childOptions.title
      };
    }
  }
);
