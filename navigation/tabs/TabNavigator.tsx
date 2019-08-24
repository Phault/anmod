import {
  getActiveChildNavigationOptions,
  createBottomTabNavigator
} from 'react-navigation';

import { MoviesTab } from './MoviesTab';
import { ThemedTabBar } from '../../components/ThemedTabBar';
import { RequestsTab } from './RequestsTab';
import { IssuesTab } from './IssuesTab';
import { ShowsTab } from './ShowsTab';

export default createBottomTabNavigator(
  {
    MoviesTab: {
      screen: MoviesTab,
      path: 'movies'
    },
    ShowsTab: {
      screen: ShowsTab,
      path: 'shows'
    },
    RequestsTab: {
      screen: RequestsTab,
      path: 'requests'
    },
    IssuesTab: {
      screen: IssuesTab,
      path: 'issues'
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
