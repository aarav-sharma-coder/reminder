import React, {Component} from 'react';
import {Alert,StyleSheet,TouchableOpacity,View,ScrollView,Text,ImageBackground,Image,Dimensions,TextInput,Lable} from 'react-native';
import Label, {Orientation} from "react-native-label";
import firebase from 'firebase';
//import Firebase from '../firebase';
import db from '../firebase';

import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { collection,doc, getDoc } from "firebase/firestore";
import {Header,Icon} from 'react-native-elements'


export default class SettingScreen extends React.Component{
  constructor(props){
    super(props);

    this.state={
     user:firebase.auth().currentUser.email
    }
    
  }
  render(){
    return(
       <SafeAreaProvider>
    <View style = {{height:25}}>
   <Header 
       leftComponent={<Icon name='bars' type='font-awesome' color='#ffffff'  onPress={() => this.props.navigation.toggleDrawer()}/>}
       centerComponent={{ text: "Settings", style: { color: '#ffffff', fontSize:20,fontWeight:"bold", } }}
       rightComponent ={<Icon name='bell' type='font-awesome' color='#ffffff' size={25}/>}
         containerStyle={{
         backgroundColor: '#32867d',
        justifyContent: 'space-around',
        height:60,
        borderBottomEndRadius:15,
        borderBottomStartRadius:15
  }}
       />
       </View>
</SafeAreaProvider>
    )
  }
}