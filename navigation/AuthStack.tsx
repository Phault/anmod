import { createStackNavigator } from 'react-navigation';
import { SignInScreen } from '../screens/auth/SignInScreen';
import { SelectServerScreen } from '../screens/auth/SelectServerScreen';

export const AuthStack = createStackNavigator(
  {
    SelectServer: SelectServerScreen,
    SignIn: SignInScreen
  },
  {
    headerMode: 'none'
  }
);
