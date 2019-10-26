import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Image, Text, View,FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Header, Button, Icon, Fab, Body} from 'native-base';
import * as actionCustomers from './../redux/actions/actionCustomers'
import AuthService from '../AuthService';


class CustomerScreen extends Component {
  constructor(props){
    super(props); 
    this.state = {
      active: false,

    }; 
  }

  async componentDidMount() {
    const token = await(new AuthService).fetch('token')
    this.props.getCustomers(token)
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
            data = {this.props.customersLocal} 
            renderItem={({item})=>{
              // console.log(`item = ${JSON.stringify(item)}, index = ${index}`);
              return(
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('CustomerEdit')}>
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
    customersLocal: state.Customers.customers
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
)(CustomerScreen);
// export default FavouriteScreen;