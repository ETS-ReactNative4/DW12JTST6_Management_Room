import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FlatGrid } from 'react-native-super-grid';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Header, Item, Input, Button, Icon, Right, Left, Body} from 'native-base';
import Modal from "react-native-modal";
import * as actionRooms from '../redux/actions/actionRooms';
import AuthService from '../AuthService';

class RoomScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      isModalVisible: false
    }
  }
  
  async componentDidMount() {
    const token = await(new AuthService).fetch('token')
    this.props.getRooms(token)
    // console.log("CONSOLEE: "+ this.props.roomsLocal)
    
  }
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  render() {
    const items = [
        { name: 'NEPHRITIS', code: '#27ae60' },{ name: 'ASBESTOS', code: '#7f8c8d' },
      ];
    // const items=[{}]
    // const Items_len = this.props.roomsLocal
    // for(i=0; i<=Items_len.length(); i++){
    //     name :items.name,

    // }
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
            items={this.props.roomsLocal}
            style={styles.gridView}
            // staticDimension={300}
            // fixed
            // spacing={20}
            renderItem={({ item, index }) => (
            <TouchableOpacity onPress={()=>this.toggleModal}>
              <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCode}>{item.code}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Modal 
                  animationType="slide"
                  transparent={false}
                  isVisible={this.state.isModalVisible}>
                  <View style={{ flex: 1 }}>
                    <Text>Hello!</Text>
                    <Button title="Hide modal" onPress={this.toggleModal} />
                  </View>
                </Modal>
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
    roomsLocal: state.Rooms.rooms
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
  )(RoomScreen);