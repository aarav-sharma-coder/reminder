import React from 'react';
import { createStackNavigator,TransitionPresets,  } from 'react-navigation-stack';

//import CardStackStyleInterpolator from 'react-navigation/dist/views/CardStack/CardStackStyleInterpolator';
import Loginscreen from '../screens/Login';
import Signupscreen  from '../screens/Signup';
import SupplyDate from '../screens/date1';

export const AppStackNavigator = createStackNavigator({
  LoginScreen : {
    screen : Loginscreen,
    navigationOptions:{
      headerShown : false
    }
  },

  Signupscreen : {
    screen : Signupscreen,
    navigationOptions:{
      headerShown : false,
      ...TransitionPresets.ModalSlideFromBottomIOS,
    }
  },
   SD: {
    screen : SupplyDate,
    navigationOptions:{
      headerShown : false,
      ...TransitionPresets.ModalSlideFromBottomIOS,
    }
  },

 },

  {
     headerMode: 'none',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
   
}
);
