import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FlatGrid } from 'react-native-super-grid';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Header,  Icon, Fab, Body} from 'native-base';
import { withNavigation } from 'react-navigation';
import * as actionRooms from '../redux/actions/actionRooms';
import AuthService from '../AuthService';
import Axios from 'axios';
import URL from '../../ENV_URL';

class RoomScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      isModalVisible: false,
      active:false,
      roomData:[]
    }
  }
  
  async componentDidMount() {
    this.getDatas()
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () =>
    {
      this.getDatas()
    });
  }
  getDatas  = async()=>{
    let token = await (new AuthService).fetch('token');       
    await this.props.getRooms(token)
    setTimeout(() => {
        this.setState({
          roomData:this.props.roomsLocal.rooms,
          token,
        });
    }, 2000);

  }
  alertConfirm(item){
    Alert.alert(
        'Delete Item',
        'Are you sure to delete this item ?',
        [
            {text: 'Yes', onPress: ()=> this.deleteRoom(item)},
            {text: 'No', onPress: ()=> '', style:'cancel'}
        ]
    )
}
  deleteRoom = async (id) => {
    const token = await (new AuthService).fetch('token')
    // console.log("INI AIDI: ",token)
    await Axios({
        method: "DELETE",
        headers: {
            'content-type': 'application/json',
            'authorization': token
        },
        url: `${URL.apiUrl}/room/${id}`
    })
    await this.getDatas()
  }
  render() {
    const items = [
        { name: 'NEPHRITIS', code: '#27ae60' },{ name: 'ASBESTOS', code: '#7f8c8d' },
      ];
    return (
      <Container style={{backgroundColor:'#455a64'}}>
        <Header style={{marginTop:20, backgroundColor:'#02a6f7'}}>
          <Body>
            <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>Room</Text>
          </Body>
        </Header>
        
        <ScrollView>
          <FlatGrid
            itemDimension={130}
            items={this.props.roomsLocal.rooms}
            style={styles.gridView}
            // staticDimension={300}
            // fixed
            // spacing={20}
            renderItem={({ item, index }) => (
              <TouchableOpacity onLongPress={()=> this.alertConfirm(item.id)} onPress={()=> this.props.navigation.navigate("RoomEdit",{dataEdit:item})}>
                <View style={[styles.itemContainer, { backgroundColor: '#27ae60' }]}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    {/* <Text style={styles.itemCode}>{item.code}</Text> */}
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
        <View style={{ flex: 1 }}>
          <Fab
            style={{backgroundColor:'#02a6f7'}}
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('RoomAdd')}>
            <Icon name="add" />
          </Fab>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    roomsLocal: state.Rooms
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRooms: (token) => dispatch(actionRooms.handleGetRooms(token))
  }
}


const styles = StyleSheet.create({
    gridView: {
      marginTop: 20,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      padding: 10,
      height: 150,
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
  )(withNavigation(RoomScreen));