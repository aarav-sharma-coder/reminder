import React, {Component} from 'react';
import {StyleSheet,TouchableOpacity,View,ScrollView,Text,ImageBackground,Image,Dimensions,TextInput,Lable} from 'react-native';
import {Icon} from 'react-native-elements';
import Label, {Orientation} from "react-native-label";
import firebase from 'firebase';
import Firebase from '../firebase';

import SweetAlert from 'react-native-sweet-alert';

export default class Loginscreen extends React.Component{
  constructor(props){
    super(props);

    this.state={
      emailId : '',
      password: ''
    }
  }
  
  
  userLogin = (username, password)=>{
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then(()=>{
      this.props.navigation.navigate('Drawer')
    })
    .catch((error)=> {
     
      var errorCode = error.code;
      
      var errorMessage = error.message;
        return SweetAlert.showAlertWithOptions({
  title: 'Error',
  subTitle: errorMessage,
  confirmButtonTitle: 'OK',
  confirmButtonColor: '#000',
  
  style: 'error',
  cancellable: false
},
 );
    })
  }

  render(){
  return(
    <ScrollView
      style={{flex:1,backgroundColor:"white"}}
      showsVerticalScrollIndicator={false}>
    
   <Image source={require('../backg.png')} style={{height:Dimensions.get('window').height/2.5,right:15,width:400}} />
   <Image source={require('../icon.png')} style= {styles.images}/>
   <View style={styles.brandView}>
    <Text style={styles.text}>Reminder App</Text>
   </View>

   <View style={styles.bottomView}>
    <View style={{padding:40,top:-20,}}>
        <View style={{left:50}}>
       <Text style={{justifyContent:"center",alignItems:"center",color:"#4632A1",fontSize:34}}>Welcome</Text>
       </View>
      <Text>Dont have an account?
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("SignupScreen")}}>
       <Text style={{color:"red",fontStyle:"italic"}}> Register now</Text>
       </TouchableOpacity>
      </Text>
      <View style={{marginTop:50}}></View>
      <View>
        <Text  style={{textShadowOffset:1,fontWeight:"bold",marginLeft:-10}}>Email:</Text>
        <TextInput
          style = {styles.loginBox}
          placeholder=""
          placeholderTextColor = "black"
          keyboardType ='email-address'
          onChangeText = {(text)=>{
            this.setState({emailId:text})
          }
          }
        ></TextInput>
        
        <Text style={{textShadowOffset:1,fontWeight:"bold",marginLeft:-10}}>Password:</Text>
        <View styles={{ flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',}}>
        
    <TextInput
          
          style = {styles.loginBox}
          placeholder=""
          secureTextEntry={true}
          placeholderTextColor = "black"
          onChangeText = {(text)=>{
            this.setState({password:text})
          }
          }

        ></TextInput>
        <Icon style={styles.icon} name="lock" type="font-awesome-5"/>
        </View>
        </View>
         <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
    </View>
   </View>
    </ScrollView>

  )
}
}

const styles = StyleSheet.create({
    images: {
      width: null,
      resizeMode: 'contain',
      top:-190,
      left:-7,
      height: 100
   },
   text:{
     fontSize:20,
     fontFamily:"tisa",
     top:-20,
     color:"black",
     fontWeight:"bold"
   },
   brandView:{
     justifyContent:"center",
     alignItems:"center",
     top:-180,
     left:-5
   },
   bottomView:{
     flex:1,
     backgroundColor:"white",
     bottom:180,
     borderTopStartRadius:60,
     borderTopEndRadius:60
   },
   loginBox:{
    
    backgroundColor:"cyan",
    width: 280,
    height: 40,
    borderBottomWidth:3,
    borderRadius:4,
    marginLeft:-10,
    borderColor : 'black',
    opacity:1,
    fontSize: 20,
    margin:10,
    paddingLeft:-30
  },
  button:{
    width:250,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"red",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'black',
    fontWeight:'250',
    fontFamily:"serif",
    fontSize:20
  },
  icon:{
    position:"absolute"
  }
})
