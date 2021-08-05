import React, {Component,useState} from 'react';
import {Alert,StyleSheet,Modal,FlatList,NativeModules,TouchableOpacity,View,ScrollView,Text,Platform,ImageBackground,Image,Dimensions,TextInput,Lable} from 'react-native';
import Label, {Orientation} from "react-native-label";
import {Picker} from '@react-native-picker/picker';
import firebase from 'firebase';
//import Firebase from '../firebase';
import Time0 from './time0' 
import db from '../firebase';
//import Modal from 'modal-react-native-web';
//import moment from 'moment';
import PushNotification,{Importance} from "react-native-push-notification";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { collection,doc, getDoc } from "firebase/firestore";
import {Header,Icon} from 'react-native-elements'
//import Modal from 'react-native-modal';
import { RFValue } from "react-native-responsive-fontsize";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';

 import SweetAlert from 'react-native-sweet-alert'
export default class Medicine extends React.Component{
  constructor(props){
    super(props);

    this.state={
     user: firebase.auth().currentUser.email,
     pickerValue:'None',
     modalVisible:this.props.navigation.getParam('mv',false),
     pickerVisible:false,
     datePickerVisible:false,
     medicineName:this.props.navigation.getParam('mn','') ,
     dose:this.props.navigation.getParam('do',''),
     time: this.props.navigation.getParam('time','Not selected'),
     date:this.props.navigation.getParam('text','Nothing sent'),
    day:this.props.navigation.getParam('day','None') ,
    toggle:'toggle-on',
    data:[]

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
          channelId: "medicine", // (required)
          channelName: "medicine channel", // (required)
          channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
          playSound: false, // (optional) default: true
          soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
          importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
   
    
  }
   receivedValue = ()=>{
   var d =  this.state.modalVisible == true?this.props.navigation.getParam('text', 'nothing sent'):''
   

  }
  mv = ()=>{
    this.setState({date:'Nothing sent'}) 
    this.setModalVisible(true)
  }
     clearState=()=>{
    this.setState({day:'None',date:'',dose: '',medicineName:''})
    this.navigation.setParams({text: 'Not selected' })
  }
  clear=()=>{
    this.setModalVisible(false)
    this.setState({dose:'',medicineName:'',date:'Nothing sent' ,day:'None',time: ''})
    console.log(this.state.date)
  }
 getNextDayOfTheWeek(dayName, excludeToday = true, refDate = new Date()) {
    const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"]
                      .indexOf(dayName.slice(0,3).toLowerCase());
    if (dayOfWeek < 0) return;
    refDate.setHours(0,0,0,0);
    refDate.setDate(refDate.getDate() + +!!excludeToday + 
                    (dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7);
    return refDate;
}
 setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
   handleConfirm = (time) => {
   this.setState({time:time})
    this.setState({pickerVisible:false})
  };
   handleConfirm2 = (date) => {
   this.setState({date:date})
    this.setState({datePickerVisible:false})
  };
  handleCancel2 = () => {
   this.setState({datePickerVisible:false})
  };
   handleCancel = () => {
   this.setState({pickerVisible:false})
  };
  showTimePicker = () => {
    this.setState({pickerVisible:true})
  };
  showDatePicker = () => {
    this.setState({datePickerVisible:true})
  };
  setNotif=()=>{

  }
 nav = ()=>{
   this.setModalVisible(false)
   this.props.navigation.navigate('MD',{mn:this.state.medicineName,do:this.state.dose,day: this.state.day,time:this.state.time},{receivedValues:this.receivedValue()}) 
   
 }
 nav2 = ()=>{
   this.setModalVisible(false)
   this.props.navigation.navigate('T0',{mn:this.state.medicineName,do:this.state.dose,day: this.state.day,date:this.state.date},{receivedValues:this.receivedValue()}) 
   
 }
  addReminder = ()=>{
     const {day,date,dose,medicineName} = this.state
     if(day !== ''|| date !=='None' && date !=='Nothing sent'){
       return(
       SweetAlert.showAlertWithOptions({
  title: 'Alert',
  subTitle: 'You cannot choose both date and repeat interval',
  confirmButtonTitle: 'OK',
  confirmButtonColor: '#000',
  
  style: 'warning',
  cancellable: true
}) 
.then(()=>{this.setState({modalVisible:false})})
       )
     }
       else if(day=='' && date == 'Nothing sent'){
      
       SweetAlert.showAlertWithOptions({
  title: 'Alert',
  subTitle: 'Please choose date',
  confirmButtonTitle: 'OK',
  confirmButtonColor: '#000',
  
  style: 'warning',
  cancellable: true
})
       
       }
        else if(dose == '' || medicineName == ''){
      
      SweetAlert.showAlertWithOptions({
  title: 'Alert',
  subTitle: 'Dose and medicine name cannot be empty!',
  confirmButtonTitle: 'OK',
  confirmButtonColor: '#000',
  
  style: 'warning',
  cancellable: true
})
       
       }
     else{
     db.collection('medicineReminder').add({
       name:this.state.medicineName,dose:this.state.dose,time:this.state.time,date:this.state.date,day:this.state.day})

  
     .then(()=>{this.setModalVisible(false)})
     .then(SweetAlert.showAlertWithOptions({
  title: 'Success',
  subTitle: 'Reminder added',
  confirmButtonTitle: 'OK',
  confirmButtonColor: '#000',
  
  style: 'success',
  cancellable: true
})).then(()=>{this.clearState()})
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
    })
     }
  }
   
async getData() {
  var DATA = []
   const func = await db
      .collection('medicineReminder')
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
    
      PushNotification.removeAllDeliveredNotifications()
  
  }
  
  render(){
   const { modalVisible,day,medicineName,dose,date} = this.state;
   var d = this.props.navigation.getParam('text','Not selected')
   if(this.state.toggle == 'toggle-off'){
      return(
      <SafeAreaProvider>
       <View style = {{height:25}}>
   <Header 
       leftComponent={<Icon name='bars' type='font-awesome' color='#ffffff'  onPress={() => this.props.navigation.toggleDrawer()}/>}
       centerComponent={{ text: "Medicine", style: { color: '#ffffff', fontSize:20,fontWeight:"bold", } }}
      rightComponent ={<Icon name={this.state.toggle} type='font-awesome-5' color='#ffffff' size={25}
       onPress={()=>{this.setState({toggle:this.state.toggle=='toggle-on'?'toggle-off':'toggle-on'})
       }}
       />}
         containerStyle={{
         backgroundColor: '#2163f6',
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
     <ScrollView showsVerticalScrollIndicator={false}>
    <View style = {{height:25}}>
   <Header 
       leftComponent={<Icon name='bars' type='font-awesome' color='#ffffff'  onPress={() => this.props.navigation.toggleDrawer()}/>}
       centerComponent={{ text: "Medicine", style: { color: '#ffffff', fontSize:20,fontWeight:"bold", } }}
      rightComponent ={<Icon name={this.state.toggle} type='font-awesome-5' color='#ffffff' size={25}
       onPress={()=>{this.setState({toggle:this.state.toggle=='toggle-on'?'toggle-off':'toggle-on'})
       }}
       />}
         containerStyle={{
         backgroundColor: '#2163f6',
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
        data={this.state.data}
        
        renderItem={({ item }) => (
          
          <View style={styles.container}>
         <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>Medicine Name: {item.name}</Text>
          <Text style={styles.content}>Dose: {item.dose}</Text>
          <Text style={styles.content}>Time: {item.time}</Text>
          <Text style={styles.content}>Date: {new Date(item.date.seconds*1000).toLocaleString().split(',')[0]}
         </Text>

          <Text style={styles.content}>Repeat: {item.day}</Text>
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
            placeholder ={'Medicine name'}
           value = {this.state.medicineName }
            onChangeText={(text)=>{
              this.setState({
               medicineName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            value={this.state.dose}
            placeholder = {'Dose'}
           keyboardType='numeric'
            onChangeText={(text)=>{
              this.setState({
                dose: text
              })
            }}
          />
        <TouchableOpacity style = {styles.cancelButton}  onPress={()=>{this.nav2()}}>
          <Text style={{color:'blue',flex:1,alignItems:'center',fontWeight:'bold',textAlign:'center',textextDecorationLine: 'underline'}}>Select time</Text>
        
        </TouchableOpacity>
        <View style={styles.cancelButton}>
            <Text style={{color:'blue',flex:1,alignItems:'center',fontWeight:'bold',textAlign:'center',textextDecorationLine: 'underline'}}>Time: {this.state.time}</Text>
          </View>
        <View>
         <Picker
        selectedValue={this.state.day}
        style={styles.pickerStyle}
      onValueChange={(itemValue) => {
        this.setState({day: itemValue});
      }} 
      >
       <Picker.Item label="None" value="None"/>
        <Picker.Item label="Everyday" value="All days"/>

        <Picker.Item label ="Every Monday" value="Monday"/>
        <Picker.Item label ="Every Tuesday" value="Tuesday"/>
        <Picker.Item label ="Every Wednesday" value="Wednesday"/>
        <Picker.Item label ="Every Thursday" value="Thursday"/>
        <Picker.Item label ="Every Friday" value="Friday"/>
        <Picker.Item label ="Every Saturday" value="Saturday"/>
        <Picker.Item label ="Every Sunday" value="Sunday"/>
         
        </Picker>
        
        </View>
        <Text style={styles.modalText}>Or</Text>
        <TouchableOpacity style={styles.cancelButton} onPress={()=>{this.nav()}}><Text style={{color:'green',flex:1,alignItems:'center',fontWeight:'bold',height:45,width:85,textAlign:'center',justifyContent:'center'}}>Select date</Text></TouchableOpacity>
        </View>
        <View style={styles.cancelButton}>
        <Text style={{color:'green',flex:1,fontWeight:'bold',height:45,width:85,textAlign:'center',justifyContent:'center'}}>Date: {new Date(this.state.date).toLocaleString().split(',')[0]} </Text>
        </View>

        <View style={{flex:0.2,alignItems:'center'}}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>{
              if(day !== 'None' && date !=='Nothing sent'){
      
       SweetAlert.showAlertWithOptions({
  title: 'Alert',
  subTitle: 'You cannot choose both date and repeat interval',
  confirmButtonTitle: 'OK',
  confirmButtonColor: '#000',
  
  style: 'warning',
  cancellable: true
}) .then(()=>{this.setState({ date :""})})
       
     }
       else if(day=='None' && date == 'Nothing sent'){
     
       SweetAlert.showAlertWithOptions({
  title: 'Alert',
  subTitle: 'Please add date',
  confirmButtonTitle: 'OK',
  confirmButtonColor: '#000',
  
  style: 'warning',
  cancellable: true
}) 
      
       }
        else if(dose == '' || medicineName == ''){
      
       SweetAlert.showAlertWithOptions({
  title: 'Alert',
  subTitle: 'Dose and medicine name cannot be empty',
  confirmButtonTitle: 'OK',
  confirmButtonColor: '#000',
  
  style: 'warning',
  cancellable: true
}) 
       
       }
     else{
     db.collection('medicineReminder').add({
       name:this.state.medicineName,dose:this.state.dose,time:this.state.time,date:date,day:this.state.day,user:this.state.user})

  
     .then(()=>{this.setModalVisible(false)})
     .then(()=>{
       if(this.state.date !=='Nothing sent' || this.state.date ==''){
      const date = new Date(this.state.date).toLocaleDateString()
      const time = this.state.time
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        channelId:'medicine',
        message: `You have to take ${this.state.dose} dose ${this.state.medicineName}`, // (required)
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
    }
    else if(this.state.day == 'Sunday'){
      var sunday = new Date(this.getNextDayOfTheWeek('Sunday',false)).toLocaleDateString()
      const time = this.state.time
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        channelId:'medicine',
        message: `You have to take ${this.state.dose} dose ${this.state.medicineName}`, // (required)
        date: new Date(`${date} ${time}:00`), // in 60 secs
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
        playSound: true, // (optional) default: true
        soundName: "default",
        vibrate:true,
        vibration:300,
        repeatType:'week',
        /* Android Only Properties */
        repeatTime: 1, 
      })
    }
    else if(this.state.day == 'Monday'){
      var sunday = new Date(this.getNextDayOfTheWeek('Monday',false)).toLocaleDateString()
      const time = this.state.time
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        channelId:'medicine',
        message: `You have to take ${this.state.dose} dose ${this.state.medicineName}`, // (required)
        date: new Date(`${date} ${time}:00`), // in 60 secs
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
        playSound: true, // (optional) default: true
        soundName: "default",
        vibrate:true,
        vibration:300,
        repeatType:'week',
        /* Android Only Properties */
        repeatTime: 1, 
      })
    }
    else if(this.state.day == 'Tuesday'){
      var sunday = new Date(this.getNextDayOfTheWeek('Tuesday',false)).toLocaleDateString()
      const time = this.state.time
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        channelId:'medicine',
        message: `You have to take ${this.state.dose} dose ${this.state.medicineName}`, // (required)
        date: new Date(`${date} ${time}:00`), // in 60 secs
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
        playSound: true, // (optional) default: true
        soundName: "default",
        vibrate:true,
        vibration:300,
        repeatType:'week',
        /* Android Only Properties */
        repeatTime: 1, 
      })
    }
    else if(this.state.day == 'Wednesday'){
      var sunday = new Date(this.getNextDayOfTheWeek('Wednesday',false)).toLocaleDateString()
      const time = this.state.time
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        channelId:'medicine',
        message: `You have to take ${this.state.dose} dose ${this.state.medicineName}`, // (required)
        date: new Date(`${date} ${time}:00`), // in 60 secs
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
        playSound: true, // (optional) default: true
        soundName: "default",
        vibrate:true,
        vibration:300,
        repeatType:'week',
        /* Android Only Properties */
        repeatTime: 1, 
      })
    }
    else if(this.state.day == 'Thursday'){
      var sunday = new Date(this.getNextDayOfTheWeek('Thursday',false)).toLocaleDateString()
      const time = this.state.time
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        channelId:'medicine',
        message: `You have to take ${this.state.dose} dose ${this.state.medicineName}`, // (required)
        date: new Date(`${date} ${time}:00`), // in 60 secs
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
        playSound: true, // (optional) default: true
        soundName: "default",
        vibrate:true,
        vibration:300,
        repeatType:'week',
        /* Android Only Properties */
        repeatTime: 1, 
      })
    }
    else if(this.state.day == 'Friday'){
      var sunday = new Date(this.getNextDayOfTheWeek('Friday',false)).toLocaleDateString()
      const time = this.state.time
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        channelId:'medicine',
        message: `You have to take ${this.state.dose} dose ${this.state.medicineName}`, // (required)
        date: new Date(`${date} ${time}:00`), // in 60 secs
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
        playSound: true, // (optional) default: true
        soundName: "default",
        vibrate:true,
        vibration:300,
        repeatType:'week',
        /* Android Only Properties */
        repeatTime: 1, 
      })
    }
    else if(this.state.day == 'Saturday'){
      var sunday = new Date(this.getNextDayOfTheWeek('Saturday',false)).toLocaleDateString()
      const time = this.state.time
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        channelId:'medicine',
        message: `You have to take ${this.state.dose} dose ${this.state.medicineName}`, // (required)
        date: new Date(`${date} ${time}:00`), // in 60 secs
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
        playSound: true, // (optional) default: true
        soundName: "default",
        vibrate:true,
        vibration:300,
        repeatType:'week',
        /* Android Only Properties */
        repeatTime: 1, 
      })
    }
    else if(this.state.day == 'All days'){
      var date = new Date().toLocaleDateString()
      const time = this.state.time
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        channelId:'water',
        message: `You have to take ${this.state.dose} dose ${this.state.medicineName}`, // (required)
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
     })
     .then(
      SweetAlert.showAlertWithOptions({
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
            
            return  SweetAlert.showAlertWithOptions({
  title: 'Alert',
  subTitle: errorMessage,
  confirmButtonTitle: 'OK',
  confirmButtonColor: '#000',
  
  style: 'error',
  cancellable: true
})
    }).then(()=>{this.setState({dose:'',medicineName:'',date:'',day:'None',time:''})})
     }
              }
              }
            >
            <Text style={styles.registerButtonText}>Add Reminder</Text>
            </TouchableOpacity>
          
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>{this.clear()}}
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
<View>
<TouchableOpacity
         style={{width:140,heigth:140,top:0,left:100}}
          onPress={() => this.mv()}
           
        >
        <Icon name='plus-circle' type='font-awesome-5' color='blue' size={55}/>
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
      borderRadius:2,
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
    marginTop:5,
  },
});
