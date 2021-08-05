import React, {Component} from 'react';
import {Alert,FlatList,Modal,StyleSheet,TouchableOpacity,View,ScrollView,Text,ImageBackground,Image,Dimensions,TextInput,Lable} from 'react-native';
//import SafeAreaView from 'react-native-safe-area-view';
import Label, {Orientation} from "react-native-label";
import firebase from 'firebase';
//import Firebase from '../firebase';
import db from '../firebase';
import PushNotification,{Importance} from "react-native-push-notification";
import MyHeader from '../components/Header'
import { collection,doc, getDoc } from "firebase/firestore";
import {b,l,d} from './var1'
import {Header,Icon} from 'react-native-elements'

import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { RFValue } from "react-native-responsive-fontsize";
import SweetAlert from 'react-native-sweet-alert';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FoodTime1 from './time1'
import FoodTime2 from './time2'
import FoodTime3 from './time3' 

export default class Food extends React.Component{
  constructor(props){
    super(props);

    this.state={
     toggle: 'toggle-on',
     user: firebase.auth().currentUser.email,
     breakfast: 'Not added',
     lunch:'Not added',
     dinner:'Not added', 
     mv:this.props.navigation.getParam('mv',false),
     x:7,
     bd:'',
     ld:'',
     dd: '',
     lp:false,
     bp:false,
     dp:false,

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
          channelId: "food", // (required)
          channelName: "food channel", // (required)
          channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
          playSound: false, // (optional) default: true
          soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
          importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
   
    
  }
  update = ()=>{
   db.collection('foodReminder').doc(this.state.user).set({Breakfast:this.state.breakfast,Lunch:this.state.lunch,Dinner:this.state.dinner}, {merge: true}).then(SweetAlert.showAlertWithOptions({
  title: 'Alert',
  subTitle: 'Reminders updated',
  confirmButtonTitle: 'OK',
  confirmButtonColor: '#000',
  
  style: 'success',
  cancellable: true
})
  ).then(()=>{this.setState({mv:false}).then(()=>{PushNotification.cancelAllLocalNotifications()}).then(()=>{
    if(this.state.bd !=='' && this.state.ld!=='' && this.state.dd!=='' && this.state.toggle == 'toogle-on'){
      this.breakfastNotif()
      this.lunchNotif()
      this.DinnerNotif()
    }
  }).then(()=>{this.getData})
})


  }
  breakfastNotif = ()=>{
    const date = new Date().toLocaleDateString()
    const time = this.state.bd
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      message: "It is time to have your breakfast", // (required)
      channelId:'food',
      date: new Date(`${date} ${time}:00`), // in 60 secs
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      playSound: true, // (optional) default: true
      soundName: "default",
      vibrate:true,
      vibration:300,
      repeatType:'day',
      /* Android Only Properties */
      repeatTime: 64, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
  }
  lunchNotif = ()=>{
    const date = new Date().toLocaleDateString()
    const time = this.state.ld
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      message: "It is time to have your lunch", // (required)
      date: new Date(`${date} ${time}:00`), // in 60 secs
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      playSound: true, // (optional) default: true
      channelId:'food',
      soundName: "default",
      vibrate:true,
      vibration:300,
      repeatType:'day',
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
  }
  DinnerNotif = ()=>{
    const date = new Date().toLocaleDateString()
    const time = this.state.dd
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      channelId:'food',
      message: "It is time to have your dinner", // (required)
      date: new Date(`${date} ${time}:00`), // in 60 secs
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
       playSound: true, // (optional) default: true
      soundName: "default",
      vibrate:true,
      vibration:300,
      repeatType:'day',
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
  }
  getTime = ()=>{
    const ref= db.collection('fr').doc(this.state.user)

     ref.get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
      ref.onSnapshot((doucumentSnapshot) => {
        // do stuff with the data

        var d = doucumentSnapshot.data();
        
        this.setState({breakfast:d.btime,lunch:d.ltime,dinner:d.dtime})

      });
    } else {   
       
    }});
  }
  getData=()=>{
    const ref = db.collection('foodReminder').doc(this.state.user)

    ref.get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
      ref.onSnapshot((doucumentSnapshot) => {
        // do stuff with the data
        var d = doucumentSnapshot.data();

        this.setState({bd:d.Breakfast,ld:d.Lunch,dd:d.Dinner})
      });
    } else {   
       
    }});
  }
  toggle=()=>{
    if(this.state.toggle == 'toggle-on'){
    PushNotification.cancelAllLocalNotifications()
    this.setState({toggle:'toggle-off'})
    }
    else if(this.state.toggle == 'toggle-off'){
      this.setState({toggle:'toggle-on'})
      this.breakfastNotif()
      this.lunchNotif()
      this.DinnerNotif()
    
    }
  }
  addAlarm = () => {
  
    if(this.state.x == this.state.breakfast){
      db.collection('allNotifications').doc(this.state.user).set({
        breakfast: 'Time to have your breakfast',
        date: firebase.firestore.Timestamp.now().toDate()
      })
      alert(" Breakfast Notification added");
    }
    else if(this.state.x == this.state.lunch){
      db.collection('allNotifications').doc(this.state.user).set({
        lunch: 'Time to have your lunch',
        date: firebase.firestore.Timestamp.now().toDate()
      })
      alert(" Lunch Notification added");
    }
    else if(this.state.x == this.state.dinner){
      db.collection('allNotifications').doc(this.state.user).set({
        dinner: 'Time to have your dinner',
        date: firebase.firestore.Timestamp.now().toDate()
      })
      alert(" Dinner Notification added");
    }
  }
  componentDidMount(){

     setInterval(()=>{
       this.getData()
     },500)
      
     
     this.getTime()

    setTimeout(()=>{
      if(this.state.breakfast=='Not added'){
       

      }
      
    })
   /* var x = new Date().getHours()
    console.log(this.state.dinner)
    if(x === this.state.breakfast){
      db.collection('allNotifications').add({
        breakfast: 'Time to have your breakfast',
        date: firebase.firestore.Timestamp.now().toDate()
      })
    }
    else if(x == this.state.lunch){
      db.collection('allNotifications').doc(this.state.user).add({
        lunch: 'Time to have your lunch',
        date: firebase.firestore.Timestamp.now().toDate()
      })
    }
    else if(x === this.state.dinner){
      db.collection('allNotifications').add({
        dinner: 'Time to have your dinner',
        date: firebase.firestore.Timestamp.now().toDate()
      })
      
    }*/
    //this.addAlarm()
  }
 
    handleConfirm = (time) => {
   this.setState({bd:time})
  };
   handleConfirm2 = (time) => {
   this.setState({ld:time})
  };
  handleConfirm3 = (time) => {
   this.setState({dd:time})
  };
  handleCancel2 = () => {
   this.setState({lp:false})
  };
   handleCancel = () => {
   this.setState({bp:false})
  };
   handleCancel3 = () => {
   this.setState({dp:false})
  };
  render(){
    if(this.state.toggle=='toggle-off'){
    return(
      <SafeAreaProvider>
       <View style = {{height:25}}>
   <Header 
       leftComponent={<Icon name='bars' type='font-awesome' color='#ffffff'  onPress={() => this.props.navigation.toggleDrawer()}/>}
       centerComponent={{ text: "Food Reminder", style: { color: '#ffffff', fontSize:20,fontWeight:"bold", } }}
      rightComponent ={<Icon name={this.state.toggle} type='font-awesome-5' color='#ffffff' size={25}
       onPress={()=>{this.setState({toggle:this.state.toggle=='toggle-on'?'toggle-off':'toggle-on'})
       }}
       />}
         containerStyle={{
         backgroundColor: '#7F00FF',
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
    title: 'Breakfast',
    content: this.state.bd,
    repeat:'Daily',
    status: this.state.toggle=='toggle-on'?'Reminder is active':'Reminder is off'
  },
  {
    title: 'Lunch',
    content: this.state.ld,
    repeat:'Daily',
    status: this.state.toggle=='toggle-on'?'Reminder is active':'Reminder is off'
  },
  {
    title: 'Dinner',
    content: this.state.dd,
    repeat:'Daily',
    status: this.state.toggle=='toggle-on'?'Reminder is active':'Reminder is off'
  },
 
];
    return(
    <SafeAreaProvider>
   
    <View style = {{height:25}}>
   <Header 
       leftComponent={<Icon name='bars' type='font-awesome' color='#ffffff'  onPress={() => this.props.navigation.toggleDrawer()}/>}
       centerComponent={{ text: "Food Reminder", style: { color: '#ffffff', fontSize:20,fontWeight:"bold", } }}
       rightComponent ={<Icon name={this.state.toggle} type='font-awesome-5' color='#ffffff' size={25}
       onPress={()=>{this.toggle()
       }}
       />}
         containerStyle={{
    backgroundColor: '#7F00FF',
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

      
       <Modal animationType="fade"
      transparent={true}
      visible={this.state.mv}>
      <View style={{flex: 1,top:-125, justifyContent: "center", alignItems: "center"}}>
       <View style={styles.modalView}>
       
        <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:RFValue(20),fontWeight:"bold",color:"#32867d"}}>Food Reminders </Text>
          </View>
          <View style={{flex:0.95}}>
         <Text style={{fontWeight:'bold',paddingTop:5}}>Breakfast: <TouchableOpacity onPress ={()=>{this.props.navigation.navigate('FT1')}}> <Text style={{borderWidth:1,backgroundColor:'cyan'}}>{this.state.breakfast?this.state.breakfast:'Not added'}</Text></TouchableOpacity></Text>
        
       <Text style={{fontWeight:'bold'}}>Lunch:       <TouchableOpacity onPress ={()=>{this.props.navigation.navigate('FT2')}}><Text style={{borderWidth:1,backgroundColor:'cyan'}}>{this.state.lunch?this.state.lunch:'Not added'}</Text></TouchableOpacity></Text>
      
       <Text style={{fontWeight:'bold'}}>Dinner :     <TouchableOpacity onPress ={()=>{this.props.navigation.navigate('FT3')}}><Text style={{borderWidth:1,backgroundColor:'cyan'}}>{this.state.dinner?this.state.dinner:'Not added' }</Text></TouchableOpacity></Text>
       
          </View>
           <View style={{flex:0.2,alignItems:'center'}}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>
              this.update()
             
              }
            >
            <Text style={styles.registerButtonText}>Update</Text>
            </TouchableOpacity>
              <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>this.setState({mv:false})}
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
       <TouchableOpacity
         style={{width:140,heigth:140,top:20,left:100}}
          onPress={() => this.setState({mv:true})}
           
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
  registerButton: {
    width: "100%",
    height: RFValue(50),
    
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
   
  },

});