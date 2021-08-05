import React, {Component} from 'react';
import {Alert,StyleSheet,TouchableOpacity,FlatList,View,ScrollView,Text,ImageBackground,Image,Dimensions,TextInput,Lable} from 'react-native';
import Label, {Orientation} from "react-native-label";
import firebase from 'firebase';
//import Firebase from '../firebase';
import db from '../firebase';
import EmailSender from 'react-native-smtp';
import BackgroundTimer from 'react-native-background-timer';
import { RFValue } from "react-native-responsive-fontsize";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import { collection,doc, getDoc } from "firebase/firestore";
import {Header,Icon} from 'react-native-elements'



export default class Record extends React.Component{
  constructor(props){
    super(props);

    this.state={
      user: firebase.auth().currentUser.email,
     data:[],
     Data:[]
    }
    
  }
  isAfterToday(date) {
    if(new Date(date).valueOf() <= new Date().valueOf()){

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
        var d = user.data().date
       var time = user.data().time
       var date = new Date(d.seconds*1000).toLocaleDateString()
       var td = new Date()
      console.log(new Date(`${date} ${time}:00`).valueOf())
      console.log(new Date().valueOf())
      //console.log(time)
        if(new Date(`${date} ${time}:00`).valueOf()<=td.valueOf()==true){
       
          DATA.push(user.data())
    }
     if(user.data().day !=='None'){
      DATA.push(user.data())
    }
        
        });
        this.setState({data:DATA})
       //console.log(this.state.data)
       console.log(DATA)
      })
    
  }
  
  componentDidMount(){
      this.getData()
  }
  render(){
    
    return(
      <SafeAreaProvider>
      <ScrollView>
    <View style = {{height:25}}>
   <Header 
       leftComponent={<Icon name='bars' type='font-awesome' color='#ffffff'  onPress={() => this.props.navigation.toggleDrawer()}/>}
       centerComponent={{ text: "Medicines Taken", style: { color: '#ffffff', fontSize:20,fontWeight:"bold", } }}
      
         containerStyle={{
         backgroundColor: 'red',
        justifyContent: 'space-around',
        height:60,
        borderBottomEndRadius:15,
        borderBottomStartRadius:15
  }}
       />
       </View>
       <View style={{marginTop:30}}>
        <FlatList 
         
         scrollEnabled={false}
        data={this.state.data}
        renderItem={({ item }) => (
          
          <View style={styles.container}>
         <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>Medicine Name: {item.name}</Text>
          <Text style={styles.content}>Dose: {item.dose}</Text>
         
          <Text style={styles.content}>Date Taken: {item.day !=='None'?`Every ${item.day}`:new Date(item.date.seconds*1000).toLocaleString().split(',')[0]}
         </Text>

          
         </View>
         </View>
        )}
      />
      </View>
      </ScrollView>
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
    backgroundColor: 'yellow',
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
