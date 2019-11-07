import React, { Component } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import { Container, Header, View, Button, Icon, Left, Body } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import URL from '../../ENV_URL';
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';
import AuthService from '../AuthService';
import Axios from 'axios';
import * as actionCustomers from './../redux/actions/actionCustomers'
import AnimatedLoader from 'react-native-animated-loader';


class CheckoutScreen extends Component {
  constructor() {
    super()
    this.state = {
        orderData: [],
        customersData: [],
        visible:false,
        data :{
          id:"",
          room: "" ,
          duration:"",
          customer:'',
          customer_id:'',
          order_id:''
        }
    };
  }
  componentDidMount() {
    const { dataEdit } = this.props.navigation.state.params
    this.setState({orderData:dataEdit,
        data:{...this.state.data, 
          room:dataEdit.name, 
          id:dataEdit.id, 
          customer_id:dataEdit.orders[0].customer_id,
          customer: dataEdit.orders[0].customer.name,
          duration:dataEdit.orders[0].duration,
          order_id:dataEdit.orders[0].id,
        }
    })
    console.log("DATA EDIT =>",dataEdit)
  }
  alertConfirm(){
    Alert.alert(
        'Checkout',
        'Are you sure to checkout this customer ?',
        [
            {text: 'Yes', onPress: ()=> this.checkout()},
            {text: 'No', onPress: ()=> '', style:'cancel'}
        ]
    )
  }
  
  checkout = async () => {
    const token = await (new AuthService).fetch('token')
    const id = this.state.data.order_id
    const data ={
      room_id: this.state.data.id,
      duration: this.state.data.duration,
      customer_id:this.state.data.customer_id
    }
    console.log("DATA CHECKOUT ==>", data)
    console.log("DATA ID ==>", id)
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
      url: `${URL.apiUrl}/histories`
    })
    await Axios({
        method: "DELETE",
        headers: {
            'content-type': 'application/json',
            'authorization': token
        },
        url: `${URL.apiUrl}/checkout/${id}`
    })
    setTimeout(()=>{
      this.setState({
        visible: !this.state.visible,      
      }); 
      this.props.navigation.navigate('Checkin')
    },1000)
  }
  render() {
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
            <Text style={{fontSize:18, color:'white', fontWeight:'bold'}}>Checkout</Text>
          </Body>
        </Header>
        <View style={{flex:1, alignItems:'center', marginTop:20}}>        
          <View style={styles.form}>
            <TextInput 
              editable={false}
              placeholder='Room Name'
              style={styles.inputBoxDisable}              
              value={this.state.data.room}
            />
            <TextInput 
              editable={false}
              // placeholder={this.props.customersLocal.customers.name}
              style={styles.inputBoxDisable}              
              value={this.state.data.customer}
            />
            
            <TextInput 
              editable={false}
              keyboardType="number-pad"
              style={styles.inputBoxDisable}              
              value={this.state.data.duration.toString()}          
            />
            <Button block danger onPress={()=> this.alertConfirm() }>
              <Text style={{fontWeight:'bold', color: 'white'}}>Checkout</Text>
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
      getCustomers: (id,token) => dispatch(actionCustomers.handleGetCustomerById(id,token))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withNavigation(CheckoutScreen));
  
 