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
      customerData: '',
      data :{
        name: "" ,
        identity_number: "",
        phone_number: "",
        image: ""
      }
      
    };
  }
  componentDidMount() {
    const { dataEdit } = this.props.navigation.state.params
    this.setState({customerData: dataEdit,
        data:{...this.state.data, name: dataEdit.name, identity_number:dataEdit.identity_number, phone_number: dataEdit.phone_number}})
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
  editCustomer = async () => {
    const token = await (new AuthService).fetch('token')
    const data ={
        name:this.state.data.name,
        identity_number:this.state.data.identity_number,
        phone_number:this.state.data.phone_number,
        image:"https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-512.png"
    }
    const id = this.state.customerData.id
    await Axios({
        method: "PATCH",
        headers: {
            'content-type': 'application/json',
            'authorization': token
        },
        data,
        url: `${URL.apiUrl}/customer/${id}`
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
            <Text style={{fontSize:18, color:'white', fontWeight:'bold'}}>Edit Customer</Text>
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
            <TextInput 
              placeholder='Identity Number'
              style={{fontSize:18, height:44, borderWidth:1, paddingHorizontal:10, margin:10, borderRadius:5, color:"white", borderColor:"white"}}
              value={this.state.data.identity_number}
              onChangeText= {(text)=>{
                this.setState({
                    data:{...this.state.data, identity_number:text}
                })
              }}/>
              <TextInput 
              placeholder='Phone Number'
              style={{fontSize:18, height:44, borderWidth:1, paddingHorizontal:10, margin:10, borderRadius:5, color:"white", borderColor:"white"}}
              value={this.state.data.phone_number}
              onChangeText= {(text)=>{
                this.setState({
                    data:{...this.state.data, phone_number:text}
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
          <Button block info onPress={()=> this.editCustomer() }>
              <Text style={{fontWeight:'bold', color: 'white'}}>Update</Text>
            </Button>
        </View>
      </Container>
    );
  }
}
