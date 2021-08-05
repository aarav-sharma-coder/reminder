import React,{Component} from 'react'
import {View,Text,FlatList,} from 'react-native'
import {Icon,Header} from 'react-native-elements'
import db from '../firebase'
import SafeAreaProvider from 'react-native-safe-area-context'
import firebase from 'firebase'
export default class Notification extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user:firebase.auth().currentUser.email,
      date:'',
      time:''
    }
  }
  getData = ()=>{
    const ref = db.collection('allNotifications').doc(this.state.user)
    ref.get()
    .then((docSnapshot)=>{
      if(docSnapshot.exists){
        ref.onSnapshot((documentSnapshot)=>{
          var data = documentSnapshot.data()
          this.setState({date:data.date})
        })
      }
    })
  
  }
  sendNotification = ()=>{
    //var te = this.state.date.slice(28,30)
    console.log(this.state.date)
  }
  componentDidMount(){
    const time = new Date().getHours()
    this.sendNotification()
    this.getData()
    console.log(this.state.date)
  }
  render(){
    return(
     <Header 
       leftComponent={<Icon name='bars' type='font-awesome' color='#ffffff'  onPress={() => this.props.navigation.toggleDrawer()}/>}
       centerComponent={{ text: "Notifications", style: { color: '#ffffff', fontSize:20,fontWeight:"bold", } }}
     
         containerStyle={{
         backgroundColor: '#2163f6',
        justifyContent: 'space-around',
        height:60,
        borderBottomEndRadius:15,
        borderBottomStartRadius:15
  }}
       />
     

    )
  }
}