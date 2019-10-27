import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Image, Text, View,FlatList, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { withNavigation} from 'react-navigation';
import { Container, Header, Button, Icon, Fab, Body} from 'native-base';
import * as actionCustomers from './../redux/actions/actionCustomers'
import AuthService from '../AuthService';
import Axios from 'axios';
import URL from '../../ENV_URL';


class CustomerScreen extends Component {
  constructor(props){
    super(props); 
    this.state = {
      active: false,
      customersData: []
    }; 
  }

  async componentDidMount() {
    this.getDatas()
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () =>
    {
      this.getDatas()
    });
  }

  alertConfirm(item){
    Alert.alert(
        'Delete Item',
        'Are you sure to delete this item ?',
        [
            {text: 'Yes', onPress: ()=> this.deleteCustomer(item)},
            {text: 'No', onPress: ()=> '', style:'cancel'}
        ]
    )
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
  componentWillUnmount(){
      // Remove the event listener
      this.focusListener.remove();
  }
  goToEditScreen(item){
    this.props.navigation.navigate("CustomerEdit", {dataEdit:item})
  }
  deleteCustomer = async (id)=>{
    const token = await (new AuthService).fetch('token')
    // console.log("INI AIDI: ",token)
    await Axios({
        method: "DELETE",
        headers: {
            'content-type': 'application/json',
            'authorization': token
        },
        url: `${URL.apiUrl}/customer/${id}`
    })
    await this.getDatas()
  }
  render() {
    return (
      <Container style={{backgroundColor:'#455a64'}}>
        <Header style={{marginTop:20, backgroundColor:'#02a6f7'}}>
          <Body>
            <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>Customer</Text>
          </Body>
        </Header>
        <ScrollView>
        
          <FlatList 
            data = {this.props.customersLocal.customers} 
            renderItem={({item})=>{
              // console.log(`item = ${JSON.stringify(item)}, index = ${index}`);
              return(
                <TouchableOpacity onLongPress={()=> this.alertConfirm(item.id)} onPress={()=> this.goToEditScreen(item)}>
                  <View style={{flex:1}}>
                    <View style={{flex:1, flexDirection:'row', borderBottomWidth:1}}>
                        <Image 
                            source ={{uri : item.image}}
                            style = {{width:70, height:70, margin:5}}>

                        </Image>
                        <View style={{flex:1, justifyContent:'center', paddingHorizontal:5}}>
                            <Text style={{fontSize:14, color:'#f2f2f2'}}>
                              {item.name}
                            </Text>
                            <Text style={{fontSize:14, color:'#f2f2f2'}}>
                              {item.identity_number}
                            </Text>
                            <Text style={{fontSize:14, color:'#f2f2f2'}}>
                              {item.phone_number}
                            </Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:'white'}}>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}
            keyExtractor={item=> item.id}
          >
          </FlatList>
        </ScrollView>
        <View style={{ flex: 1 }}>
          <Fab
            style={{backgroundColor:'#02a6f7'}}
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('CustomerAdd')}>
            <Icon name="add" />
          </Fab>
        </View>
      </Container>
    );
  }
}

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
)(withNavigation(CustomerScreen));
// export default FavouriteScreen;