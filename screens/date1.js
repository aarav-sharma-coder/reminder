import React,{Component} from 'react'
import SupplyScreen from './Supply'
import { DatePickerModal } from 'react-native-paper-dates';

export default class SupplyDate extends React.Component{
  constructor(props){
    super(props)

    this.state={
      visible:false,
      
    }
  }
  confirm = (date)=>{
    this.props.navigation.navigate('SupplyScreen',{text:date.date,mn:this.props.navigation.getParam('mn',''),mv:true})
    console.log(date)
  }
  dismiss = ()=>{
    this.props.navigation.navigate('SupplyScreen')
  }
  render(){
    const date = new Date()
    return(
       <DatePickerModal
        // locale={'en'} optional, default: automatic
        mode="single"
        visible={this.state.visible}
        onDismiss={this.dismiss}
        date = {date}
        onConfirm={this.confirm}
        validRange={{
        startDate: new Date(),  // optional
           // optional
       }}
       
        // onChange={} // same props as onConfirm but triggered without confirmed by user
        // saveLabel="Save" // optional
        // label="Select date" // optional
        // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
      />
    )
  }
}