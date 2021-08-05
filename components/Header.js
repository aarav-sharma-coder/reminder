import React,{Component} from 'react'
import {Header,Icon} from 'react-native-elements'

export default class MyHeader extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <Header
       leftComponent={<Icon name='bars' type='font-awesome' color='#ffffff'  onPress={() => this.props.navigation.toggleDrawer()}/>}
       centerComponent={{ text: this.props.title, style: { color: '#ffffff', fontSize:20,fontWeight:"bold", } }}
       rightComponent ={<Icon name='bell' type='font-awesome' color='#ffffff' size={25}/>}
       />
    )
  }
}