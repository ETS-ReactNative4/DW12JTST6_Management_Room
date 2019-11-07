import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Image, Text, View,FlatList, TouchableOpacity, Alert, StyleSheet, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { withNavigation} from 'react-navigation';
import { Container, Header, Button, Icon, Fab, Body, Left, Item, Input} from 'native-base';
import * as actionCustomers from './../redux/actions/actionCustomers'
import AuthService from '../AuthService';
import Axios from 'axios';
import URL from '../../ENV_URL';
import AnimatedLoader from 'react-native-animated-loader';


class CustomerScreen extends Component {
  constructor(props){
    super(props); 
    this.state = {
      active: false,
      customersData: [],
      data:[],
      visible:false,
    }; 
    this.arrayHolder = []
  }

  async componentDidMount() {
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
    this.setState({
      visible: !this.state.visible,      
    });        
    await this.props.getCustomers(token)
    setTimeout(() => {
        this.setState({
          visible: !this.state.visible,      
          customersData:this.props.customersLocal.customers,
          token,
        });
        this.arrayHolder=this.props.customersLocal.customers
    }, 500);
  }
  componentWillUnmount(){
      // Remove the event listener
      this.focusListener.remove();
  }
  goToEditScreen(item){
    this.setState({
      visible: !this.state.visible,      
    }); 
    this.props.navigation.navigate("CustomerEdit", {dataEdit:item})
    this.loading()
  }
  deleteCustomer = async (id)=>{
    const token = await (new AuthService).fetch('token')
    this.setState({
      visible: !this.state.visible,      
    }); 
    // console.log("INI AIDI: ",token)
    await Axios({
        method: "DELETE",
        headers: {
            'content-type': 'application/json',
            'authorization': token
        },
        url: `${URL.apiUrl}/customer/${id}`
    })
    this.loading()
    await this.getDatas()
  }
  loading = () => {
    setTimeout(() => {
        this.setState({
            visible: !this.state.visible,      
        });    
    }, 1000);  
  };
  searchFilter = (text) => {
    const newData = this.arrayHolder.filter(item=>{
      const itemData = `${item.name.toUpperCase()} ${item.identity_number.toUpperCase()} ${item.phone_number.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    })
    this.setState({ customersData : newData })
  }
  render() {
    const { visible } = this.state;  
    const  data   = this.state.customersData
    return (
      <Container style={{backgroundColor:'#455a64'}}>
        <AnimatedLoader 
          visible={visible} 
          overlayColor="rgba(255,255,255,0.75)" 
          animationStyle={styles.lottie} 
          speed={1} 
        />
        <Header style={{marginTop:20, backgroundColor:'#e67e22'}}>
          {/* <Left>
            <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>Customer</Text>
          </Left> */}
          <Body>
            <Item>
              <Icon name="ios-search"/>
                <TextInput 
                  style ={{color:'white', width:'90%', fontSize:16, padding:5}}
                  placeholder='Search Customer...'
                  onChangeText={(text)=>{this.searchFilter(text)}}
                  autoCorrect={false}
                >
                </TextInput>
            </Item>
          </Body>
        </Header>
        <ScrollView>
          <FlatList 
            data = { data } 
            renderItem={({item})=>{
              // console.log(`item = ${JSON.stringify(item)}, index = ${index}`);
              return(
                <TouchableOpacity onLongPress={()=> this.alertConfirm(item.id)} onPress={()=> this.goToEditScreen(item)}>
                  <View style={{flex:1}}>
                    <View style={styles.listItem}>
                        <Image 
                            source ={{uri : item.image}}
                            style = {{width:90, height:90, margin:5, borderRadius:8}}/>
                        <View style={{flex:1, justifyContent:'center', paddingHorizontal:5}}>
                            <Text style={styles.description}>
                              {item.name}
                            </Text>
                            <Text style={styles.description}>
                              No. id : {item.identity_number}
                            </Text>
                            <Text style={styles.description}>
                              Phone : {item.phone_number}
                            </Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:'white'}}>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item)=> item.id.toString()}
          >
          </FlatList>
        </ScrollView>
        <View style={{ position:'relative' }}>
          <Fab
            style={{backgroundColor:'#e67e22'}}
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
const styles = StyleSheet.create({
  description:{
    fontSize:14,
    color:'#e67e22',
    paddingHorizontal:5,
  },
  listItem:{
    flex:1, 
    flexDirection:'row', 
    borderRadius:4,
    backgroundColor:'#F8EFBA',
    padding:5,
    margin:5,
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
)(withNavigation(CustomerScreen));
