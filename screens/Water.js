import React, {Component} from 'react';
import {Alert,StyleSheet,Modal,TouchableOpacity,FlatList,View,ScrollView,Text,ImageBackground,Image,Dimensions,TextInput,Lable} from 'react-native';
import { List, ListItem } from "react-native-elements"
import Label, {Orientation} from "react-native-label";
import firebase from 'firebase';
//import Firebase from '../firebase';
import { RFValue } from "react-native-responsive-fontsize";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import SweetAlert from 'react-native-sweet-alert';
import WaterTime1 from './time4'
import WaterTime2 from './time5'
import WaterTime3 from './time6'
import WaterTime4 from './time7' 
import WaterTime5 from './time8'
import Reminders from "@wiicamp/react-native-reminders";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { collection,doc, getDoc } from "firebase/firestore";
import {Header,Icon} from 'react-native-elements'
import db from '../firebase'
import ReactNativeAN from 'react-native-alarm-notification';
import PushNotification,{Importance} from "react-native-push-notification";
export default class Water extends React.Component{
  constructor(props){
    super(props);

    this.state={
     toggle:'toggle-on',
     r1:'',
     r2:'',
     r3:'',
     r4:'',
     r5:'',
     R1:'',
     R2:'',
     R3:'',
     R4:'',
     R5:'',
     r1v: false,
     r2v:false,
     r3v:false,
     r4v:false,
     r5v:false,
     visible:this.props.navigation.getParam('mv',false),
     user:firebase.auth().currentUser.email
    }
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
    
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    
        // process the notification
    
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
    
      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
    
        // process the action
      },
    
      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },
    
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
    
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
    
      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
    
    
      PushNotification.createChannel(
        {
          channelId: "water", // (required)
          channelName: "water channel", // (required)
          channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
          playSound: false, // (optional) default: true
          soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
          importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
  }
  getData = ()=>{
    const ref = db.collection('waterReminder').doc(this.state.user)

    ref.get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
      ref.onSnapshot((doucumentSnapshot) => {
        // do stuff with the data
        var d = doucumentSnapshot.data();
        this.setState({R1:d.Reminder1,R2:d.Reminder2,R3:d.Reminder3,R4:d.Reminder4,R5:d.Reminder5})
      });
    } else {   
       
    }
});

     /* db.collection('waterReminder').doc(this.state.user).onSnapshot(doucumentSnapshot=>{
       
        var d = doucumentSnapshot.data();
        this.setState({r1:d.Reminder1,r2:d.Reminder2,r3:d.Reminder3,r4:d.Reminder4,r5:d.Reminder5})
       
      })*/
              
      
  }
  componentDidMount(){
    setInterval(()=>{
      this.getData()
    },0)
    this.getTime()
  }
  addNotif1=()=>{
   
      const date = new Date().toLocaleDateString()
      const time = this.state.R1
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        channelId:'water',
        message: "It is time to some water", // (required)
        date: new Date(`${date} ${time}:00`), // in 60 secs
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
        playSound: true, // (optional) default: true
        soundName: "default",
        vibrate:true,
        vibration:300,
        repeatType:'day',
        /* Android Only Properties */
        repeatTime: 1, 
      })
    
  }
  addNotif2=()=>{
    
      const date = new Date().toLocaleDateString()
      const time = this.state.R2
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        channelId:'water',
        message: "It is time to some water", // (required)
        date: new Date(`${date} ${time}:00`), // in 60 secs
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
        playSound: true, // (optional) default: true
        soundName: "default",
        vibrate:true,
        vibration:300,
        repeatType:'day',
        /* Android Only Properties */
        repeatTime: 1, 
      })
    
  }
  addNotif3=()=>{
    
    const date = new Date().toLocaleDateString()
    const time = this.state.R3
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      channelId:'water',
      message: "It is time to some water", // (required)
      date: new Date(`${date} ${time}:00`), // in 60 secs
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      playSound: true, // (optional) default: true
      soundName: "default",
      vibrate:true,
      vibration:300,
      repeatType:'day',
      /* Android Only Properties */
      repeatTime: 1, 
    })
  
}
addNotif4=()=>{
    
  const date = new Date().toLocaleDateString()
  const time = this.state.R4
  PushNotification.localNotificationSchedule({
    //... You can use all the options from localNotifications
    channelId:'water',
    message: "It is time to some water", // (required)
    date: new Date(`${date} ${time}:00`), // in 60 secs
    allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
    playSound: true, // (optional) default: true
    soundName: "default",
    vibrate:true,
    vibration:300,
    repeatType:'day',
    /* Android Only Properties */
    repeatTime: 1, 
  })

}
addNotif5=()=>{
    
  const date = new Date().toLocaleDateString()
  const time = this.state.R5
  PushNotification.localNotificationSchedule({
    //... You can use all the options from localNotifications
    channelId:1,
    message: "It is time to some water", // (required)
    date: new Date(`${date} ${time}:00`), // in 60 secs
    allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
    playSound: true, // (optional) default: true
    soundName: "default",
    vibrate:true,
    vibration:300,
    repeatType:'day',
    /* Android Only Properties */
    repeatTime: 1, 
  })

}
  update2 = ()=>{
   db.collection('waterReminder').doc(this.state.user).set({Reminder1:this.state.r1,Reminder2:this.state.r2,Reminder3:this.state.r3,Reminder4:this.state.r4,Reminder5:this.state.r5}, {merge: true}).then(  SweetAlert.showAlertWithOptions({
  title: 'Success',
  subTitle: 'Reminder added',
  confirmButtonTitle: 'OK',
  confirmButtonColor: '#000',
  
  style: 'success',
  cancellable: true
})).then(()=>{PushNotification.cancelAllLocalNotifications()})
.then(()=>{
  this.addNotif1();
  this.addNotif2();
  this.addNotif3();
  this.addNotif4();
  this.addNotif5();
})

.then(()=>{this.setState({visible:false})})
}
 handleConfirm4 = (time) => {
   this.setState({r1:time})
  };
  handleCancel4 = () => {
   this.setState({r1v:false})
  };
   handleConfirm5 = (time) => {
   this.setState({r2:time})
  };
  handleCancel5 = () => {
   this.setState({r2v:false})
  };
   handleConfirm6 = (time) => {
   this.setState({r3:time})
  };
  handleCancel6 = () => {
   this.setState({r3v:false})
  };
   handleConfirm7 = (time) => {
   this.setState({r4:time})
  };
  handleCancel7 = () => {
   this.setState({r4v:false})
  };
   handleConfirm8 = (time) => {
   this.setState({r5:time})
   }
   getTime = ()=>{
    const ref= db.collection('wr').doc(this.state.user)

     ref.get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
      ref.onSnapshot((doucumentSnapshot) => {
        // do stuff with the data

        var d = doucumentSnapshot.data();
        
        this.setState({r1:d.r1,r2:d.r2,r3:d.r3,r4:d.r4,r5:d.r5})

      });
    } else {   
       
    }});
  }
  
  render(){
   
  if(this.state.toggle=='toggle-off'){
    return(
      <SafeAreaProvider>
       <View style = {{height:25}}>
   <Header 
       leftComponent={<Icon name='bars' type='font-awesome' color='#ffffff'  onPress={() => this.props.navigation.toggleDrawer()}/>}
       centerComponent={{ text: "Water Reminder", style: { color: '#ffffff', fontSize:20,fontWeight:"bold", } }}
      rightComponent ={<Icon name={this.state.toggle} type='font-awesome-5' color='#ffffff' size={25}
       onPress={()=>{this.setState({toggle:this.state.toggle=='toggle-on'?'toggle-off':'toggle-on'})
       }}
       />}
         containerStyle={{
         backgroundColor: '#3D6DCC',
        justifyContent: 'space-around',
        height:60,
        borderBottomEndRadius:15,
        borderBottomStartRadius:15
  }}
       />
     
    
       <View style={{
    
    position: 'absolute', 
    top: 250, left: 0, 
    right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
}}>
    <Text style={{ justifyContent: 'center', 
    alignItems: 'center',  position: 'absolute', color: 'red',fontWeight:"bold"}}>
       Reminders are off
    </Text>
</View>
       </View>
      
      </SafeAreaProvider>
      
    )
  }


    const DATA = [
  {
    title: 'Reminder1',
    content: this.state.R1,
    repeat:'Daily',
    status: this.state.toggle=='toggle-on'?'Reminder is active':'Reminder is off'
  },
  {
    title: 'Reminder2',
    content: this.state.R2,
    repeat:'Daily',
    status: this.state.toggle=='toggle-on'?'Reminder is active':'Reminder is off'
  },
  {
    title: 'Reminder3',
    content: this.state.R3,
    repeat:'Daily',
    status: this.state.toggle=='toggle-on'?'Reminder is active':'Reminder is off'
  },
   {title: 'Reminder4',
    content: this.state.R4,
    repeat:'Daily',
    status: this.state.toggle=='toggle-on'?'Reminder is active':'Reminder is off'},
    {
       title: 'Reminder5',
    content: this.state.R5,
    repeat:'Daily',
    status: this.state.toggle=='toggle-on'?'Reminder is active':'Reminder is off'
    }
];
  
    return(
     
       <SafeAreaProvider style={{backgroundColor: 'transparent'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
    <View style = {{height:25}}>
   <Header 
       leftComponent={<Icon name='bars' type='font-awesome' color='#ffffff'  onPress={() => this.props.navigation.toggleDrawer()}/>}
       centerComponent={{ text: "Water Reminder", style: { color: '#ffffff', fontSize:20,fontWeight:"bold", } }}
      rightComponent ={<Icon name={this.state.toggle} type='font-awesome-5' color='#ffffff' size={25}
       onPress={()=>{this.setState({toggle:this.state.toggle=='toggle-on'?'toggle-off':'toggle-on'})
       }}
       />}
         containerStyle={{
         backgroundColor: '#3D6DCC',
        justifyContent: 'space-around',
        height:60,
        borderBottomEndRadius:15,
        borderBottomStartRadius:15
  }}
       />
     
    
   
       </View>

      <View style={{paddingTop:35}}>
         <FlatList 
         
         scrollEnabled={true}
        data={DATA}
        renderItem={({ item }) => (
          <View style={styles.container}>
         <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>Time: {item.content}</Text>
          <Text style={styles.content}>Repeat: {item.repeat}</Text>
          <Text style={styles.content}>Status: {item.status}</Text>
         </View>
         </View>
        )}
      />
      </View>
       <Modal animationType="fade"
      transparent={true}
      visible={this.state.visible}>
       <View style={{flex:1,justifyContent:"center",alignContent:"center",}}>
       <View style={styles.modalView2}>
        
        <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:RFValue(20),fontWeight:"bold",color:"#32867d"}}>Water Reminders </Text>
          </View>

          <View style={{flex:0.95}}>
          <Text style={{fontWeight:'bold',paddingTop:5}}>Reminder 1: <TouchableOpacity onPress ={()=>{this.props.navigation.navigate('WR1')}}><Text style={{borderWidth:1,backgroundColor:'cyan'}}>{this.state.r1 ? this.state.r1:'Not added' }
          </Text></TouchableOpacity></Text>
          <Text style={{fontWeight:'bold',paddingTop:5}}>Reminder 2: <TouchableOpacity onPress ={()=>{this.props.navigation.navigate('WR2')}}><Text style={{borderWidth:1,backgroundColor:'cyan'}}>{this.state.r2 ? this.state.r2:'Not added' }</Text></TouchableOpacity></Text>
         <Text style={{fontWeight:'bold',paddingTop:5}}>Reminder 3: <TouchableOpacity onPress ={()=>{this.props.navigation.navigate('WR3')}}><Text style={{borderWidth:1,backgroundColor:'cyan'}}>{this.state.r3 ? this.state.r3:'Not added' }</Text></TouchableOpacity></Text>
       <Text style={{fontWeight:'bold',paddingTop:5}}>Reminder 4: <TouchableOpacity onPress ={()=>{this.props.navigation.navigate('WR4')}}><Text style={{borderWidth:1,backgroundColor:'cyan'}}>{this.state.r4 ? this.state.r4:'Not added' }</Text></TouchableOpacity></Text>
       <Text style={{fontWeight:'bold',paddingTop:5}}>Reminder 5: <TouchableOpacity onPress ={()=>{this.props.navigation.navigate('WR5')}}><Text style={{borderWidth:1,backgroundColor:'cyan'}}>{this.state.r5 ? this.state.r5:'Not added' }</Text></TouchableOpacity></Text>
        
          </View>

        <View style={{flex:0.2,alignItems:'center'}}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>
              this.update2()
              }
            >
            <Text style={styles.registerButtonText}>Update</Text>
            </TouchableOpacity>
             <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>this.setState({visible:false})}
            >
            <Text style={{  fontSize : RFValue(20),
                fontWeight:'bold',
                color: "#32867d",
                marginTop:RFValue(10)
                }}>
                  Cancel
                </Text>
            </TouchableOpacity>
            </View>
            
            </View>
           </View>
      </Modal>
      
    </ScrollView>
   <View style={styles.add}>
       <TouchableOpacity
         style={{width:140,heigth:140,top:0,left:100}}
          onPress={() => this.setState({visible:true})}
           
        >
        <Icon name='plus-circle' type='font-awesome-5' color='purple' size={55}/>
        </TouchableOpacity>
  </View>
</SafeAreaProvider>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:10
  },
  content:{
    fontSize:12,
    fontStyle:'italic',
    color:"purple"
  
  },
  title: {
    fontSize: 17,
    fontWeight:'bold',
     color:"red",
  },
   modalView: {
    margin: 40,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
   modalView2: {
    margin: 40,
    backgroundColor: "white",
    borderRadius: 20,
    padding: -175,
    
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
   registerButton: {
    width: "100%",
    height: RFValue(50),
    marginTop:RFValue(-15),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(3),
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
   
  },
  registerButtonText: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#fff",
  },
  cancelButton:{
    width:200,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 0, 

  },
  add:{
     backgroundColor: 'transparent',
  }

});