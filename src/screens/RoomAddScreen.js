import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { Container, Header, View, Button, Icon, Left, Body, Right } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import URL from '../../ENV_URL';
import AuthService from '../AuthService';
import Axios from 'axios';

export default class RoomAddScreen extends Component {
  constructor() {
    super()
    this.state = {
      name: ""
      
    };
  }
  componentDidMount() {
    // this.getPermissionAsync();
  }

  
  addRoom = async () => {
    const token = await (new AuthService).fetch('token')
    const data ={
        name:this.state.name
    }
    await Axios({
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'authorization': token
        },
        data,
        url: `${URL.apiUrl}/room`
    })
    setTimeout(()=>{
        this.props.navigation.navigate('Room')
    },2000)
  }
  render() {
    let { image } = this.state
    return (  
      <Container style={{backgroundColor:'#455a64'}}>
        <Header style={{marginTop:20, backgroundColor:'#02a6f7'}}>
        <Left>
            <Button transparent onPress={()=> this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Text style={{fontSize:18, color:'white', fontWeight:'bold'}}>Add Room</Text>
          </Body>
        </Header>
        <View>
          <TextInput 
              placeholder='Name'
              style={{fontSize:18, height:44, borderWidth:1, paddingHorizontal:10, margin:10, borderRadius:5, color:"white", borderColor:"white"}}
              value={this.state.name}
              onChangeText= {(text)=>{
                this.setState({
                    name:text
                })
            }}/>
        </View>
        
        <View style={{ margin:10 }}>
          <Button block info onPress={()=> this.addRoom() }>
              <Text style={{fontWeight:'bold', color: 'white'}}>Save</Text>
            </Button>
        </View>
      </Container>
    );
  }
}
