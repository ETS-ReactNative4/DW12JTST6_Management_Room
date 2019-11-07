import React, { Component } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { Container, Header, View, Button, Icon, Left, Body, Right } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import URL from '../../ENV_URL';
import AuthService from '../AuthService';
import Axios from 'axios';
import AnimatedLoader from 'react-native-animated-loader';


export default class RoomAddScreen extends Component {
  constructor() {
    super()
    this.state = {
        roomData: '',
        visible:false,
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
    this.setState({
      visible: !this.state.visible,      
    });  
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
        this.setState({
          visible: !this.state.visible,      
        });  
    },2000)
  }
  render() {
    let { image } = this.state
    const { visible } = this.state;
    return (  
      <Container style={{backgroundColor:'#455a64'}}>
        <AnimatedLoader 
          visible={visible} 
          overlayColor="rgba(255,255,255,0.75)" 
          animationStyle={styles.lottie} 
          speed={1} 
        />
        <Header style={{marginTop:20, backgroundColor:'#e67e22'}}>
        <Left>
            <Button transparent onPress={()=> this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Text style={{fontSize:18, color:'white', fontWeight:'bold'}}>Edit Room</Text>
          </Body>
        </Header>
        <View style={{flex:1, alignItems:'center', marginTop:20}}>        
          <View style={styles.form}>
            <TextInput 
              placeholder='Name'
              style ={styles.inputBox}
              value={this.state.data.name}
              onChangeText= {(text)=>{
                this.setState({
                    data:{...this.state.data, name:text}
                })
            }}/>
            <Button block success onPress={()=> this.editRoom() }>
              <Text style={{fontWeight:'bold', color: 'white'}}>Update</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  form:{
    backgroundColor:"#f1f2f6", 
    padding:10, 
    borderRadius:7, 
    width:'90%',
    borderColor:'#e67e22',

  },
  inputBox:{
    fontSize:16, 
    height:43, 
    borderWidth:1, 
    paddingHorizontal:10, 
    margin:5, 
    borderRadius:5, 
    color:"#000", 
    borderColor:"#e67e22"
  },
  lottie: {
    width: 100,    
    height: 100,  
  }
})