import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { LoadingScreen } from '../screens/LoadingScreen';
import { AuthStack } from './AuthStack';
import { DrawerNavigator } from './DrawerNavigator';

const RootNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  Auth: { screen: AuthStack },
  App: {
    screen: DrawerNavigator,
    path: ''
  }
});

export default createAppContainer(RootNavigator);
