import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
  TextInput
} from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import { Avatar } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import db from "../firebase";
import { Icon } from "react-native-elements";

import { RFValue } from "react-native-responsive-fontsize";

export default class CustomSideBarMenu extends Component {
  state = {
    userId: firebase.auth().currentUser.email,
    image: "#",
    name: "",
    docId: "",
  };

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userId);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };

  getUserProfile() {
    db.collection("email")
      .where("mail", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().name,
            docId: doc.id,
            image: doc.data().image,
          });
        });
      });
  }

  componentDidMount() {
    
    this.fetchImage(this.state.userId);
    this.getUserProfile();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            top:0,
            flex: 0.3,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#32867d",
          }}
        >
        <View style={{top:22}}>
          <Avatar
            rounded
            source={{
              uri: this.state.image,
            }}
            size={"xlarge"}
            onPress={() => this.selectPicture()}
            showEditButton
          />
        </View>
        <View style={{alignContent:'center',alignSelf:'center',alignItems:'center',top:11}}>
         <TextInput
            style={{
              fontWeight: "300",
              
              fontSize: RFValue(23),
              color: "#fff",
              padding: RFValue(25),
              height:20,
              alignContent:'center',
              alignSelf:'center',alignItems:'center',
              textAlignVertical : "top",
              textAlign:'center'
            }}
            maxLength={7} 
            textAlign={'center'}
            placeholder=''
            value= {this.state.name}
            onChangeText={(text)=>{
              this.setState({name:text})
              this.fetchImage(this.state.userId)
              db.collection('email').doc(this.state.userId).update({name:text})
            }}
          />
          </View>
          <View style={{right:50,bottom:22}}> <Icon type='font-awesome-5' name='user-edit' size={20}/></View>
           
          
        </View>
        <View style={{ flex: 0.6 }}>
          <DrawerItems {...this.props}  />
        </View>
        <View style={{ flex: 0.1 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              height: "100%",
            }}
            onPress={() => {
              this.props.navigation.navigate("LoginScreen");
              firebase.auth().signOut();
            }}
          >
            <Icon
              name="logout"
              type="antdesign"
              size={RFValue(20)}
              iconStyle={{ paddingLeft: RFValue(10) }}
            />

            <Text
              style={{
                fontSize: RFValue(15),
                fontWeight: "bold",
                marginLeft: RFValue(30),
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

