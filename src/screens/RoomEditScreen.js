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
        roomData: '',
        data :{
          name: "" ,
        }
      
    };
  }
  componentDidMount() {
    // this.getPermissionAsync();
    const { dataEdit } = this.props.navigation.state.params
    this.setState({roomData:dataEdit,
        data:{...this.state.data, name:dataEdit.name
        }
    })

  }

  
  editRoom = async () => {
    const token = await (new AuthService).fetch('token')
    
    const data ={
        name:this.state.data.name
    }
    const id = this.state.roomData.id
    await Axios({
        method: "PATCH",
        headers: {
            'content-type': 'application/json',
            'authorization': token
        },
        data,
        url: `${URL.apiUrl}/room/${id}`
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
            <Text style={{fontSize:18, color:'white', fontWeight:'bold'}}>Edit Room</Text>
          </Body>
        </Header>
        <View>
          <TextInput 
              placeholder='Name'
              style={{fontSize:18, height:44, borderWidth:1, paddingHorizontal:10, margin:10, borderRadius:5, color:"white", borderColor:"white"}}
              value={this.state.data.name}
              onChangeText= {(text)=>{
                this.setState({
                    data:{...this.state.data, name:text}
                })
            }}/>
        </View>
        
        <View style={{ margin:10 }}>
          <Button block info onPress={()=> this.editRoom() }>
              <Text style={{fontWeight:'bold', color: 'white'}}>Update</Text>
            </Button>
        </View>
      </Container>
    );
  }
}
