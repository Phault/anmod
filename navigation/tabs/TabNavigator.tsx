import {
  getActiveChildNavigationOptions,
  createBottomTabNavigator
} from 'react-navigation';

import { MoviesTab } from './MoviesTab';
import { ThemedTabBar } from '../../components/ThemedTabBar';

// const ThemedMaterialTopTabBar = props => {
//   const theme = useContext(ThemeContext);
//   return (
//     <MaterialTopTabBar
//       activeTintColor={theme.colors.primary}
//       inactiveTintColor="#CFD8DC"
//       pressColor={theme.colors.primary}
//       style={{ backgroundColor: theme.colors.surface }}
//       indicatorStyle={{
//         backgroundColor: theme.colors.primary
//       }}
//       {...props}
//     />
//   );
// };
// export default createMaterialTopTabNavigator(
//   {
//     Movies: MoviesStack,
//     Shows: ShowStack,
//     Music: MusicStack,
//     Requests: RequestsStack,
//     Issues: IssuesStack
//   },
//   {
//     // lazy: true,
//     swipeEnabled: false,
//     tabBarPosition: 'bottom',
//     tabBarComponent: ThemedMaterialTopTabBar,
//     tabBarOptions: {
//       showIcon: true
//     },
//     navigationOptions: ({ navigation, screenProps }) => {
//       const childOptions = getActiveChildNavigationOptions(
//         navigation,
//         screenProps
//       );
//       return {
//         headerTitle: childOptions.title
//       };
//     }
//   }
// );

export default createBottomTabNavigator(
  {
    MoviesTab: {
      screen: MoviesTab,
      path: 'movies'
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
