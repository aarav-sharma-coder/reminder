import React, {Component} from 'react';
import {Icon,Alert,StyleSheet,TouchableOpacity,View,ScrollView,Text,ImageBackground,Image,Dimensions,TextInput,Lable} from 'react-native';
import Label, {Orientation} from "react-native-label";
import firebase from 'firebase';
//import Firebase from '../firebase';
import db from '../firebase';

import { collection,doc, getDoc } from "firebase/firestore";
import SweetAlert from 'react-native-sweet-alert';

export default class Signupscreen extends React.Component{
  constructor(props){
    super(props);

    this.state={
      emailId : '',
      password: '',
      guardianEmail:'',
      name:''
    }
  }

  handleSignUp = () => {
        const { emailId, password,guardianEmail,name } = this.state
        db.auth()
            .createUserWithEmailAndPassword(emailId, password)
            .then(()=>{db.firestore().collection("email").doc("guardian").add({mail:emailId,name:name})})
            .then(() => this.props.navigation.navigate('Loginscreen'))
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
})
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
      <Text>Already have an account?
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("LoginScreen")}}>
       <Text style={{color:"red",fontStyle:"italic"}}> Login now</Text>
       </TouchableOpacity>
      </Text>
      <View style={{marginTop:50}}></View>
      <View>
        <Text  style={{textShadowOffset:1,fontWeight:"bold",marginLeft:-10}}>Name:</Text>
        <TextInput
          style = {styles.loginBox}
          placeholder=""
          placeholderTextColor = "black"
          onChangeText = {(text)=>{
            this.setState({name:text})
          }
          }
        ></TextInput>

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

        
        </View>
         <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=> {const { email, password,guardianEmail } = this.state
          firebase.auth()
            .createUserWithEmailAndPassword(this.state.emailId, this.state.password)
            .then((response)=>{db.collection('email').doc(this.state.emailId).set({name:this.state.name,email:this.state.emailId,mail:this.state.emailId})},{merge: true})
            .then(()=>{this.props.navigation.navigate("Drawer")})
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
})
    })
            }}
    
            >
            <Text style={styles.buttonText}>Signup</Text>
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
      top:-230,
      left:-7,
      height: 100
   },
   text:{
     fontSize:20,
     fontFamily:"tisa",
     top:-30,
    
     color:"black",
     fontWeight:"bold"
   },
   brandView:{
     justifyContent:"center",
     alignItems:"center",
     top:-220,
     left:-5
   },
   bottomView:{
     flex:1,
     backgroundColor:"white",
     bottom:215,
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
})
