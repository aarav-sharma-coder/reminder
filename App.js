import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'
import 'react-native-gesture-handler';
import CustomSidebarMenu  from './components/customSideBarMenu';
import {createDrawerNavigator} from 'react-navigation-drawer';

import {AppStackNavigator} from './components/StackNavigation';
import { AppTabNavigator } from './components/TabNavigation'
import Loginscreen from './screens/Login'
import Signupscreen from './screens/Signup'
//import {AppDrawerNavigator} from './components/DrawerNavigation';

import MedicineDate from './screens/date2'
import Record from './screens/Record';

import SettingScreen from './screens/Setting';
import NotificationScreen from './screens/Record';
import {Icon} from 'react-native-elements';
import Notification from './screens/Notification'
import SupplyDate from './screens/date1'
import FoodTime1 from './screens/time1'
import FoodTime2 from './screens/time2'
import FoodTime3 from './screens/time3'
import WaterTime1 from './screens/time4'
import WaterTime2 from './screens/time5'
import WaterTime3 from './screens/time6'
import WaterTime4 from './screens/time7'
import WaterTime5 from './screens/time8'
import Time0 from './screens/time0'
export default function App() {
  
  return (
    <AppContainer/>
  );
}

const AppDrawerNavigator = createDrawerNavigator({

  Home : {
    screen : AppTabNavigator,
    navigationOptions:{
      drawerIcon : <Icon name="home" type ="fontawesome5" />
    }
    },
  Record :{
    screen : Record,
    navigationOptions:{
      drawerIcon : <Icon name="notes-medical" type ="font-awesome-5" />,
      drawerLabel : "Medicinal record"
    }
  },
},
  {
    contentComponent:CustomSidebarMenu
  },
  {
    initialRouteName : 'Home'
  });

const switchNavigator = createSwitchNavigator({
  LoginScreen:{screen: Loginscreen},
  SignupScreen: {screen: Signupscreen},
  SD:{screen:SupplyDate},
  MD:{screen:MedicineDate},
   T0:{screen:Time0},
   FT1:{screen:FoodTime1},
  FT2:{screen:FoodTime2},
  FT3:{screen:FoodTime3},
  WR1:{screen:WaterTime1},
  WR2:{screen:WaterTime2},
  WR3:{screen:WaterTime3},
  WR4:{screen:WaterTime4},
  WR5:{screen:WaterTime5},
  Drawer:{screen: AppDrawerNavigator},
 
})

const AppContainer = createAppContainer(switchNavigator);