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

export default class CustomersAddScreen extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      identity_number: "",
      phone_number: "",
      image: ""
      
    };
  }
  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  addCustomer = async () => {
    const token = await (new AuthService).fetch('token')
    const data ={
        name:this.state.name,
        identity_number:this.state.identity_number,
        phone_number:this.state.phone_number,
        image:"https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-512.png"
    }
      console.log('INI DATA',data)
    
    await Axios({
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'authorization': token
        },
        data,
        url: `${URL.apiUrl}/customer`
    })
    setTimeout(()=>{
        this.props.navigation.navigate('Customer')
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
            <Text style={{fontSize:18, color:'white', fontWeight:'bold'}}>Add Customer</Text>
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
            <TextInput 
              placeholder='Identity Number'
              style={{fontSize:18, height:44, borderWidth:1, paddingHorizontal:10, margin:10, borderRadius:5, color:"white", borderColor:"white"}}
              value={this.state.identity_number}
              onChangeText= {(text)=>{
                this.setState({
                    identity_number:text
                })
              }}/>
              <TextInput 
              placeholder='Phone Number'
              style={{fontSize:18, height:44, borderWidth:1, paddingHorizontal:10, margin:10, borderRadius:5, color:"white", borderColor:"white"}}
              value={this.state.phone_number}
              onChangeText= {(text)=>{
                this.setState({
                    phone_number:text
                })
              }}/>
              <View style={{alignItems:'center'}}>
                <Button 
                  style={{width:53,height:53}}
                  rounded danger
                  onPress={ this._openCamera }>
                  <Icon name="camera"></Icon>
                </Button>
                <Image source={{ uri: image }} style={{ marginVertical:10, width: 100, height: 100 }} />
              </View>
        </View>
        
        <View style={{ margin:10 }}>
          <Button block info onPress={()=> this.addCustomer() }>
              <Text style={{fontWeight:'bold', color: 'white'}}>Save</Text>
            </Button>
        </View>
      </Container>
    );
  }
}
