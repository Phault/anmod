import { createDrawerNavigator } from 'react-navigation';
import MainTabNavigator from './tabs/TabNavigator';
import { ContentComponent } from '../components/drawer/ContentComponent';

export const DrawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      path: ''
    }
  },
  {
    contentComponent: ContentComponent
  }
);
