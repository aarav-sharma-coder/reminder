import React,{Component} from 'react'
import WaterScreen from './Water'
import {View} from 'react-native'
import { TimePickerModal } from 'react-native-paper-dates';
import db from '../firebase'
import firebase from 'firebase'
export default class WaterTime1 extends React.Component{
  constructor(props){
    super(props)

    this.state={
      visible:false,
      id:firebase.auth().currentUser.email 
    }
  }
  confirm = (time)=>{
    db.collection('wr').doc(this.state.id).set({r4:`${time.hours}:${time.minutes}`},{merge:true}).then(()=>{this.props.navigation.navigate('WaterScreen'),{mv:true}})
  }
  
  dismiss = ()=>{
    this.props.navigation.navigate('WaterScreen')
  }
  render(){
    const date = new Date()
    return(
      <View style={{marginTop:240}}>
        <TimePickerModal
        visible={true}
        onDismiss={this.dismiss}
        onConfirm={this.confirm}
        hours={12} // co: current hours
        minutes={14} // default: current minutes
        label="Select time" // optional, default 'Select time'
        cancelLabel="Cancel" // optional, default: 'Cancel'
        confirmLabel="Ok" // optional, default: 'Ok'
        animationType="fade" // optional, default is 'none'
        locale={'en'} // optional, default is automically detected by your system
  /> 
      </View>
      )
  }
}