import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Image, Text, View } from 'react-native';
import { Container, Header, Button, Icon, Right, Left, Body} from 'native-base';
import * as actionUser from './../redux/actions/actionUsers';
import AuthService from '../AuthService';

export default class SettingScreen extends React.Component {
  constructor(){
    super();
    this.state={
      name:'Irvan',
      image: 'https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-512.png',
      email:"irvandindaprakoso@gmail.com"
    }
  }
  async logout(){
    await(new AuthService).destroy()
    this.props.navigation.navigate('Login')
  }
  // async componentDidMount() {
  //   const id = await(new AuthService).fetch('id')
  //   const token = await(new AuthService).fetch('token')
  //   this.props.getUser(id, token)
  //   // console.log("CONSOLEE: "+ this.props.roomsLocal)
  // }
  render() {
    return (
      <Container style={{backgroundColor:'#455a64'}}>
        <Header style={{marginTop:20, backgroundColor:'#02a6f7'}}>
          <Body>
            <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>Setting</Text>
          </Body>
        </Header>
        <View style={{flex:1}}>
          <View style={{flex:1, borderBottomWidth:1, fontSize:16}}>
            <View style={{ flex: 1, alignItems: 'center', marginVertical:20 }}>
                <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />
                <Text style={{color:'#fff', flex:1, fontSize:18, fontWeight:'bold'}}>{this.state.name}</Text>
                <Text style={{color:'#fff', flex:1, fontSize:18, fontWeight:'bold'}}>{this.state.email}</Text>
            </View>
            <Button block warning onPress={() => this.logout()}><Text>Log Out</Text></Button>
          </View>
        </View>
      </Container>
    );
  }
}

// const mapStateToProps = state => {
//     return {
//       roomsLocal: state.User.user
//     }
//   }
  
//   const mapDispatchToProps = dispatch => {
//     return {
//       getUser: (id, token) => dispatch(actionUser.handleGetUser(id, token))
//     }
//   }
//   export default connect(
//       mapStateToProps,
//       mapDispatchToProps
//     )(SettingScreen);