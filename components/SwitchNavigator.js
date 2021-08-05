import React from 'react';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import {AppTabNavigator} from './TabNavigation';
import Loginscreen from '../screens/Login';
import Signupscreen  from '../screens/Signup';

const switchNavigator = createSwitchNavigator({
  LoginScreen:{screen: Loginscreen},
  SignupScreen: {screen: Signupscreen},
  BottomTab:{screen:AppTabNavigator},
})

export default switchNavigator