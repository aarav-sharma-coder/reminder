import React,{Component} from 'react'
import SupplyScreen from './Supply'
import {View} from 'react-native'
import db from '../firebase' 
import { TimePickerModal } from 'react-native-paper-dates';
import firebase from 'firebase'
import {b,l,d} from './var1'
export default class FoodTime1 extends React.Component{
  constructor(props){
    super(props)

    this.state={

      visible:false,
      id:firebase.auth().currentUser.email
      
    }
  }
  confirm = (time)=>{
    db.collection('fr').doc(this.state.id).set({btime:`${time.hours}:${time.minutes}`},{merge:true}).then(()=>{this.props.navigation.navigate('FoodScreen'),{mv:true}})
   }
   
   
  dismiss = ()=>{
    this.props.navigation.navigate('FoodScreen')
  }
  render(){
    
    const date = new Date()
    return(
       <View style={{top:240}}>
        <TimePickerModal
        visible={true}
        onDismiss={this.dismiss}
        onConfirm={this.confirm}
        hours={12} // default: current hours
        minutes={14} // default: current minutes
        label="Select time" // optional, default 'Select time'
        cancelLabel="Cancel" // optional, default: 'Cancel'
        confirmLabel="Ok" // optional, default: 'Ok'
        animationType="fade" // optional, default is 'none'
        locale={'en'} // optional, default is automically detected by your system
      /> </View>)
  }
}