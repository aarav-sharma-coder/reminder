import React,{Component} from 'react'
import MedicineScreen from './Medicine'
import {View} from 'react-native'

import { TimePickerModal } from 'react-native-paper-dates';

export default class Time0 extends React.Component{
  constructor(props){
    super(props)

    this.state={
      visible:false,
      date:this.props.navigation.getParam('date','')
      
    }
  }
  confirm = (time)=>{
    this.props.navigation.navigate('MedicineScreen',{time:`${time.hours}:${time.minutes}`,mv:true,mn:this.props.navigation.getParam('mn',''),do:this.props.navigation.getParam('do',''),text:this.props.navigation.getParam('date','None'),day:this.props.navigation.getParam('day','')})
   
  }
  dismiss = ()=>{
    this.props.navigation.navigate('MedicineScreen')
  }
  render(){
    
    const date = new Date()
    return(
       <View style={{top:240}}>
        <TimePickerModal
        visible={false}
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