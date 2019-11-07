import React, { Component } from 'react';
import { Text, Picker, StyleSheet } from 'react-native';
import { Container, Header, View, Button, Icon, Left, Body } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import URL from '../../ENV_URL';
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';
import AuthService from '../AuthService';
import Axios from 'axios';
import * as actionCustomers from './../redux/actions/actionCustomers'
import AnimatedLoader from 'react-native-animated-loader';


class CheckinAddScreen extends Component {
  constructor() {
    super()
    this.state = {
        orderData: [],
        customersData: [],
        visible:false,
        data :{
          id:"",
          room: "" ,
          duration: '',
          customer:''
        }
    };
  }
  componentDidMount() {
    this.getDatas()
    const { dataEdit } = this.props.navigation.state.params
    this.setState({orderData:dataEdit,
        data:{...this.state.data, room:dataEdit.name, id:dataEdit.id
        }
    })

  }
  getDatas  = async()=>{
    let token = await (new AuthService).fetch('token');       
    await this.props.getCustomers(token)
    setTimeout(() => {
        this.setState({
          customersData:this.props.customersLocal.customers,          
          token,
        });
    }, 2000);
   }
  
  addCheckin = async () => {
    const token = await (new AuthService).fetch('token')
    const data ={
        room_id: this.state.data.id,
        duration: this.state.data.duration,
        customer_id:this.state.data.customer
    }
    console.log('INI DATANYA :' , data.customer_id)
    if (data.customer_id== undefined){
      alert('Please select customers');
    }
    else{
      this.setState({
        visible: !this.state.visible,      
      }); 
      await Axios({
          method: "POST",
          headers: {
              'content-type': 'application/json',
              'authorization': token
          },
          data,
          url: `${URL.apiUrl}/checkin`
      })
      setTimeout(()=>{
          this.props.navigation.navigate('Checkin')
          this.setState({
            visible: !this.state.visible,      
          }); 
      },2000)
    }
  }
  onValueChange = (value) => {
    this.setState({
        data  : {
        ...this.state.data,
      customer : value 
    }});
  }
  render() {
    let data = this.props.customersLocal.customers;
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
            <Button transparent onPress={()=> this.props.navigation.goBack()} style={{ alignItems:'center'}}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Text style={{fontSize:18, color:'white', fontWeight:'bold'}}>Add Checkin</Text>
          </Body>
        </Header>
        <View style={{flex:1, alignItems:'center', marginTop:20}}>        
          <View style={styles.form}>
            <TextInput 
              editable={false}
              placeholder='Room Name'
              style={styles.inputBoxDisable}
              value={this.state.data.room}
              onChangeText= {(text)=>{
                this.setState({
                    data:{...this.state.data, id:text}
                    
                })
              }}/>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Picker
                note
                mode="dropdown"
                style={{width:'80%'}}
                selectedValue={this.state.data.customer}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="-- Select Customer --" />
                {
                    this.props.customersLocal.customers.map((item)=>{
                      return(
                        <Picker.Item label={item.name} value={item.id} key={item.id}/>
                      )
                    })
                }
              </Picker>
              <Button info rounded onPress={()=> this.props.navigation.navigate("CustomerAdd")}>
                <Icon name="add">
                </Icon>
              </Button>
            </View>
            <TextInput 
              keyboardType={'numeric'}
              placeholder='duration'
              style={styles.inputBox}
              value={this.state.data.duration}
              onChangeText= {(text)=>{
                this.setState({
                    data:{...this.state.data, duration:text}
                    
                })
            }}/>
            <Button block success onPress={()=> this.addCheckin() }>
              <Text style={{fontWeight:'bold', color: 'white'}}>Checkin</Text>
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
  inputBoxDisable:{
    fontSize:16, 
    height:43, 
    borderWidth:1, 
    paddingHorizontal:10, 
    margin:5, 
    borderRadius:5, 
    color:"#7f8c8d", 
    borderColor:"#7f8c8d"
  },
  lottie: {
    width: 100,    
    height: 100,  
  },
})

const mapStateToProps = state => {
    return {
      customersLocal: state.Customers
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      getCustomers: (token) => dispatch(actionCustomers.handleGetCustomers(token))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withNavigation(CheckinAddScreen));
  
