import React, {Component} from 'react';
import {Alert,StyleSheet,FlatList,Modal,TouchableOpacity,View,ScrollView,Text,ImageBackground,Image,Dimensions,TextInput,Lable} from 'react-native';
import Label, {Orientation} from "react-native-label";
import firebase from 'firebase';
//import Firebase from '../firebase';
import db from '../firebase';
import { RFValue } from "react-native-responsive-fontsize";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification,{Importance} from "react-native-push-notification";
import SweetAlert from 'react-native-sweet-alert';
import { DatePickerModal } from "react-native-paper-dates";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { collection,doc, getDoc } from "firebase/firestore";
import {Header,Icon} from 'react-native-elements'
//import PushNotification from "react-native-push-notification";
export default class Supply extends React.Component{
  constructor(props){
    super(props);

    this.state={
      user:firebase.auth().currentUser.email,
     pickerVisible:false,
     modalVisible:this.props.navigation.getParam('mv',false) ,
     medicine:this.props.navigation.getParam('mn',''),
     toggle:'toggle-on',
     data: [],
     startDate: this.props.navigation.getParam('text','Nothing sent'),
     dateVisible:false,
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
          channelId: "supply", // (required)
          channelName: "supply channel", // (required)
          channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
          playSound: false, // (optional) default: true
          soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
          importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
   
    
  }
  
   setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
   showDatePicker = () => {
    this.setState({dateVisible:true})
  };
    onConfirm = (date) => {
   this.setState({startDate:date.date})
    this.setState({dateVisible:false})
  };
    handleCancel = () => {
   this.setState({dateVisible:false})
  };
  receivedValue = ()=>{
   const text =  this.props.navigation.getParam('text', 'nothing sent');
   this.setState({startDate:text})
  }
 cancel=()=>{
   this.setModalVisible(false)
   this.clear()
 }
  async getData() {
  var DATA = []
   const func = await db
      .collection('supplyReminder')
      .where('user','==',this.state.user)
      .get()
      .then(snapshot => {
        snapshot.forEach(user => {
        
        
        DATA.push(user.data())
          
        });
        this.setState({data:DATA})
       
      })
    
  }
  componentDidMount(){
     setInterval(()=>{
         this.getData()
     },10)
    PushNotification.removeAllDeliveredNotifications()
     
  }
toDateTime(secs) {
    var t = new Date(Date.UTC(1970, 0, 1)); // Epoch
    t.setUTCSeconds(secs);
    return t;
}
clear=()=>{
  this.setState({medicine:'',startDate:''})
}
  render(){
    const {modalVisible} = this.state
    //const text =  this.props.navigation.getParam('text', 'nothing sent');
     
     
    
    if(this.state.toggle == 'toggle-off'){
       return(
      <SafeAreaProvider>
       <View style = {{height:25}}>
   <Header 
       leftComponent={<Icon name='bars' type='font-awesome' color='#ffffff'  onPress={() => this.props.navigation.toggleDrawer()}/>}
       centerComponent={{ text: "Stock", style: { color: '#ffffff', fontSize:20,fontWeight:"bold", } }}
      rightComponent ={<Icon name={this.state.toggle} type='font-awesome-5' color='#ffffff' size={25}
       onPress={()=>{this.setState({toggle:this.state.toggle=='toggle-on'?'toggle-off':'toggle-on'})
       }}
       />}
         containerStyle={{
         backgroundColor: '#d13560',
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
    return(
      <SafeAreaProvider>
      <ScrollView>
    <View style = {{height:25}}>
   <Header 
       leftComponent={<Icon name='bars' type='font-awesome' color='#ffffff'  onPress={() => this.props.navigation.toggleDrawer()}/>}
       centerComponent={{ text: "Stock", style: { color: '#ffffff', fontSize:20,fontWeight:"bold", } }}
      rightComponent ={<Icon name={this.state.toggle} type='font-awesome-5' color='#ffffff' size={25}
       onPress={()=>{this.setState({toggle:this.state.toggle=='toggle-on'?'toggle-off':'toggle-on'})
       }}
       />}
         containerStyle={{
         backgroundColor: '#d13560',
        justifyContent: 'space-around',
        height:60,
        borderBottomEndRadius:15,
        borderBottomStartRadius:15
  }}
       />
          <View style={{paddingTop:35}}>
         <FlatList 
         
         scrollEnabled={true}
        data={this.state.data}
        renderItem={({ item }) => (
          <View style={styles.container}>
         <View style={styles.item}>
         
          <Text style={styles.content}>Medicine Name: {item.medicineName}</Text>
           <Text style={styles.content}>Date:{new Date(item.date.seconds*1000).toLocaleString().split(',')[0] }</Text>
          
          
         </View>
         </View>
        )}
      />
      </View>
        <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.modalVisible}
      >
      <View style={styles.modalView}>
        <View style={{width:'100%'}}>
        <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:RFValue(20),fontWeight:"bold",color:"#32867d"}}>Reminder </Text>
          </View>
          <View style={{flex:0.95}}>
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Medicine Name"}
            value = {this.state.medicine}
            onChangeText={(text)=>{
              this.setState({
               medicine: text
              })
            }}
          />
        
       <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('SD',{mn:this.state.medicine})}}>
        <View style={styles.cancelButton} ><Text style={{color:'green',flex:1,alignItems:'center',fontWeight:'bold',height:45,width:85,textAlign:'center',justifyContent:'center'}}>Select date</Text></View>
 </TouchableOpacity>
         </View>
         <View style={styles.cancelButton}><Text style={{color:'green',flex:1,alignItems:'center',fontWeight:'bold',height:45,width:85,textAlign:'center',justifyContent:'center'}}>Date: {new Date(this.state.startDate).toLocaleString().slice(0,8)} </Text>

         </View>
        <View style={{flex:0.2,alignItems:'center'}}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>{
            if (this.state.startDate !=='Nothing sent'){
              db.collection('supplyReminder').

               add({user:this.state.user,medicineName:this.state.medicine,date:this.state.startDate})

  
     .then(()=>{this.setModalVisible(!modalVisible)})
     .then(()=>{
      const date = new Date(this.state.startDate*1000).toLocaleDateString()
      const time = '7:00:00'
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
        //repeatType:'day',
        /* Android Only Properties */
        //repeatTime: 1, 
      })
     })
     .then(SweetAlert.showAlertWithOptions({
  title: 'Success',
  subTitle: 'Reminder added',
  confirmButtonTitle: 'OK',
  confirmButtonColor: '#000',
  
  style: 'success',
  cancellable: true
}))
     .catch((error)=> {
            var errorCode = error.code;
            var errorMessage = error.message;
            return SweetAlert.showAlertWithOptions({
  title: 'Alert',
  subTitle: errorMessage,
  confirmButtonTitle: 'OK',
  confirmButtonColor: '#000',
  
  style: 'error',
  cancellable: true
})
    }).then(()=>{this.clear()})
              }else{
               SweetAlert.showAlertWithOptions({
  title: 'Alert',
  subTitle: 'Please choose date',
  confirmButtonTitle: 'OK',
  confirmButtonColor: '#000',
  
  style: 'warning',
  cancellable: true
})
              }
              }
              }
            >
            <Text style={styles.registerButtonText}>Add Reminder</Text>
            </TouchableOpacity>
          
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>{this.cancel()}}
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
    

       
       </View>
      </ScrollView>
      <View>
       <TouchableOpacity
         style={{width:140,heigth:140,top:0,left:100}}
          onPress={() => this.setModalVisible(true)}
           
        >
        <Icon name='plus-circle' type='font-awesome-5' color='red' size={55}/>
        </TouchableOpacity>
        </View>
</SafeAreaProvider>
    )
  }
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
  
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight:'bold',
    top:-2,
    color:'red'
  },
  formTextInput:{
      width: "90%",
      height: RFValue(45),
      padding: RFValue(10),
      borderWidth:1,
      bordrRadius:2,
      borderColor:"grey",
      paddingBottom:RFValue(10),
      marginLeft:RFValue(20),
      marginBottom:RFValue(14)
  },
   pickerStyle:{
    width:'70%',
    height:40,
    alignSelf:'center',
    marginTop:10,
    textAlign:'center',
    backgroundColor:'cyan',
    border:'solid',
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
  },
   button: {
    width: 150,
    marginTop: 20,
    backgroundColor: "green",
    padding: 15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
  },
   item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:10
  },
  content:{
    fontSize:17,
    fontStyle:'italic',
    color:"purple"
  
  },
  registerButton: {
    width: "85%",
    height: RFValue(50),
    marginTop:RFValue(20),
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
    marginTop: RFValue(10),
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
