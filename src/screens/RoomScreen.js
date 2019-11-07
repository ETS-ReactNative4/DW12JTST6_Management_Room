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
import AnimatedLoader from 'react-native-animated-loader';


class RoomScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      isModalVisible: false,
      active:false,
      roomData:[],
      visible:false

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
    await this.props.getRooms(token)
    setTimeout(() => {
        this.setState({
          visible: !this.state.visible,      
          roomData:this.props.roomsLocal.rooms,
          token,
        });
    }, 500);
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
    this.setState({
      visible: !this.state.visible,      
    });  
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
            <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>Room</Text>
          </Body>
        </Header>
        <ScrollView>
          <FlatGrid
            itemDimension={100}
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
            style={{backgroundColor:'#e67e22'}}
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
      justifyContent:'center'
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