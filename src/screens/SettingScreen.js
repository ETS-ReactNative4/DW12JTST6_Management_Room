import React, { Component } from 'react';
import { Image, Text, View, StyleSheet, Alert } from 'react-native';
import { Container, Header, Button, Body} from 'native-base';
import AuthService from '../AuthService';

export default class SettingScreen extends Component {
  constructor(){
    super();
    this.state={
      name:'',
      image: '',
      email:""
    }
  }
  async componentDidMount() {
    const username = await (new AuthService).fetch('username')
    const email = await (new AuthService).fetch('email')
    const image = await (new AuthService).fetch('image')
    this.setState({name:username, email:email, image:image})
  }
  async logout(){
    await(new AuthService).destroy()
    this.props.navigation.navigate('Login')
  }
  alertConfirm(){
    Alert.alert(
        'Logout of HotelQ ',
        'Are you sure to log out ?',
        [
            {text: 'Yes', onPress: ()=> this.logout()},
            {text: 'No', onPress: ()=> '', style:'cancel'}
        ]
    )
  }
  render() {
    return (
      <Container style={{backgroundColor:'#f1f2f6'}}>
        <Header style={styles.header}>
          {/* <Body style={{ alignItems:'center'}}>
            <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>Setting</Text>
          </Body> */}
        </Header>
        <View style={{alignItems:'center', marginTop:-110, marginBottom:30}}>
          <Image source={{ uri: this.state.image }} style={styles.image} />
          <Text style={styles.text}>{this.state.name}</Text>
          <Text style={{fontSize:17, }}>{this.state.email}</Text>
        </View>
        <View style={{alignItems:'center'}}>
          <Button bordered danger onPress={() => this.alertConfirm()} style={{width:110}}>
            <Text style={{ paddingLeft:21, color: 'red', fontWeight:'bold', fontSize:16 }}>Log Out</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor:'#e67e22',
    height:230,
  },
  form:{
    padding:10, 
    borderRadius:7, 
    width:'90%',
    borderColor:'#e67e22',
    alignItems:'center',
    backgroundColor:"#F8EFBA",
  },
  image:{
    alignItems:'center',
    width:180,
    height:180,
    borderRadius: 90,
    borderWidth:5,
    margin:10
  },
  text:{
    color:"#000",
    fontSize:27,
    fontWeight:'bold',

  }
})
