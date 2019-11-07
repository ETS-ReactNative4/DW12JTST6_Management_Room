import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FlatGrid } from 'react-native-super-grid';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Header, Body} from 'native-base';
import * as actionOrders from './../redux/actions/actionOrders';
import { withNavigation } from 'react-navigation';
import AuthService from '../AuthService';
import moment from 'moment';
import Axios from 'axios';
import URL from '../../ENV_URL';
import AnimatedLoader from 'react-native-animated-loader';



class CheckinScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      orderData:[],
      visible:false,
      data:{
        name: '',
        is_booked:false,
        is_done:true,
        duration:0,
        order_end_time:'',
        room_id:'',
        customer_id:'',

      }
    }
  }
  async componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () =>
    {
      this.getDatas()
    });
  }
  getDatas  = async()=>{
    let token = await (new AuthService).fetch('token'); 
    this.setState({
      visible: !this.state.visible,      
    }); 
    await this.props.getOrders(token)
    this.setState({
      visible: !this.state.visible,      
    }); 
    const getData = this.props.ordersLocal.orders
    this.setState({data:{...this.state.data, 
        room_id:getData.id,
      }
    })
    this.interval = setInterval(() => {
      this.checkAvailableRoom()
    }, 30000)
  }

  goToCheckIn(item){
    this.setState({
      visible: !this.state.visible,      
    }); 
    this.props.navigation.navigate('CheckinAdd', {dataEdit:item})
    this.loading()
  }
  goToCheckout(item){
    this.setState({
      visible: !this.state.visible,      
    }); 
    this.props.navigation.navigate('Checkout', {dataEdit:item})    
    this.loading()
  }
  checkAvailableRoom= async ()=>{
    const token = await (new AuthService).fetch('token')    
    const orders = this.props.ordersLocal.orders

    for(let i=0; i<orders.length; i++){
      if(orders[i].orders[0]!==undefined){
        if (moment(orders[i].orders[0].order_end_time).diff(moment(), 'minutes') <= 0){
          const id = orders[i].orders[0].id          
          const data ={
            room_id: orders[i].id,
            duration: orders[i].orders[0].duration,
            customer_id:orders[i].orders[0].customer_id
          }
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
              this.getDatas()
          },500)
        }
      }
    }
  }
  loading = () => {
    setTimeout(() => {
        this.setState({
            visible: !this.state.visible,      
        });    
    }, 1000);  
  };
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
          <Body style={{ alignItems:'center'}}>
            <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>Checkin</Text>
          </Body>
        </Header>
        <ScrollView>
            <FlatGrid
                itemDimension={100}
                items={this.props.ordersLocal.orders}
                style={styles.gridView}
                // staticDimension={300}
                // fixed
                // spacing={20}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={item.orders != '' ? item.orders[0].is_booked != false ? () => this.goToCheckout(item) : () => this.goToCheckIn(item) : () => this.goToCheckIn(item)}>
                    <View style={[styles.itemContainer, { backgroundColor: item.orders != '' ? item.orders[0].is_booked != false ? '#7f8c8d' : '#27ae60' : '#27ae60' }]}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={{}}>{item.orders != '' ? moment(item.orders[0].order_end_time).diff(moment(), 'minutes')+" minute(s) left to available" : 'Available'}</Text>
                    </View>
                  </TouchableOpacity>
                )}
            />
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    ordersLocal: state.Orders
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getOrders: (token) => dispatch(actionOrders.handleGetOrders(token))
  }
}

const styles = StyleSheet.create({
    gridView: {
      marginTop: 20,
      flex: 1,
    },
    lottie: {
      width: 100,    
      height: 100,  
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      padding: 10,
      height: 100,
    },
    itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
  });

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withNavigation(CheckinScreen));