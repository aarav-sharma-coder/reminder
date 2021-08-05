import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Food from '../screens/Food';
import Medicine from '../screens/Medicine';
import Water from '../screens/Water';
import Supply from '../screens/Supply';
import {Icon} from 'react-native-elements';
 

export const AppTabNavigator = createBottomTabNavigator(
  {
  FoodScreen : {
    screen: Food,
    navigationOptions :{
      tabBarLabel : "Food",
      tabBarIcon:({ focused }) =>
      <Image source={require("../foof.png")} style={{marginTop:focused?-5:19 ,width:38, height:38,}}/>,
      tabBarPosition: 'top',
   animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#7F00FF',
      style: {
        backgroundColor: '#7F00FF',
        borderTopStartRadius:15,
         borderTopEndRadius:14,
        height:60,
        paddingTop: 3,
        paddingBottom: 4,
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: { width: 10, height: 10 }
      },
      labelStyle: {
        fontSize: 13,
        fontWeight:500,
        marginTop:-2
      },
    },
    }
  },
  MedicineScreen: {
    screen: Medicine,
    navigationOptions :{
      tabBarLabel : "Medicine",
      tabBarIcon: ({ focused }) =>
      <Image source={require("../medicine.png")} style={{ marginTop:focused? -2 : 15,width:33, height:33,}}/>,
      tabBarPosition: 'top',
   animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#2163f6',
      style: {
        backgroundColor: '#2163f6',
       borderTopStartRadius:15,
         borderTopEndRadius:14,
        height:60,
        paddingTop: 3,
        paddingBottom: 4,
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: { width: 10, height: 10 }
      },
      labelStyle: {
        fontSize: 13,
        fontWeight:500,
        marginTop:-2
      },
    },
    } 
  },
  WaterScreen: {
    screen: Water,
    navigationOptions :{
      tabBarLabel : "Water",
      tabBarIcon:({ focused }) => <Image source={require("../assets/w.png")} focused={focused} style={{marginTop: focused? -2 : 15,width:33, height:33,}}/>,
      tabBarPosition: 'top',
   animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#3D6DCC',
      style: {
        backgroundColor: '#3D6DCC',
        borderTopStartRadius:15,
         borderTopEndRadius:14,
        height:60,
        paddingTop: 3,
        paddingBottom: 4,
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: { width: 10, height: 10 }
      },
      labelStyle: {
        fontSize: 13,
        fontWeight:500,
        marginTop:-2
      },
    },
    }
  },
  SupplyScreen: {
    screen: Supply,
    navigationOptions :{
      tabBarLabel : "Stock",
      tabBarIcon:({ focused }) =>
      <Image source={require("../stock.png")} style={{marginTop:focused?-3:15,width:48, height:48,}}/>,
      tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#d13560',
      style: {
        
        backgroundColor: '#d13560',
      borderTopStartRadius:15,
         borderTopEndRadius:14,
        height:60,
        paddingTop: 3,
        paddingBottom: 4,
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: { width: 10, height: 10 },
        
      },
      labelStyle: {
        fontSize: 13,
        fontWeight:500,
        marginTop:-2
      },
    },
    },
  },
 },
 {
   tabBarPosition: 'top',
   animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#7F00FF',
      style: {
      backgroundColor: '#7F00FF',
      
        height:60,
        paddingTop: 3,
        paddingBottom: 4,
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: { width: 10, height: 10 },
         borderTopStartRadius:15,
         borderTopEndRadius:13,
      },
      labelStyle: {
        fontSize: 13,
        fontWeight:500,
        marginTop:-2
      },
    },
  }
 );
