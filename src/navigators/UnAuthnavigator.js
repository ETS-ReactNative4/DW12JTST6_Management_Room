import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const UnAuth = createStackNavigator(
    {    
      Login:LoginScreen,
      Register:RegisterScreen,
    },
    {
      initialRouteName: 'Login',
      headerMode: 'none'
    }
  );

  export default createAppContainer(UnAuth);