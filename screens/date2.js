import React,{Component} from 'react'
import MedicineScreen from './Medicine'
import { DatePickerModal } from 'react-native-paper-dates';

export default class MedicineDate extends React.Component{
  constructor(props){
    super(props)

    this.state={
      visible:false,
      
    }
  }
 
  confirm = (date)=>{
    
    this.props.navigation.navigate('MedicineScreen',{text:date.date,mv:true,mn:this.props.navigation.getParam('mn',''),do:this.props.navigation.getParam('do',''),time:this.props.navigation.getParam('time',''),day:this.props.navigation.getParam('day','')})
    console.log(date)
  }
  dismiss = ()=>{
    this.props.navigation.navigate('MedicineScreen')
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