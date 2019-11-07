import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { View } from 'react-native';
import { Icon } from 'native-base';
import CheckinScreen from '../screens/CheckinScreen';
import CheckinAddScreen from '../screens/CheckinAddScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
// ROOM 
import RoomScreen from '../screens/RoomScreen';
import RoomAddScreen from '../screens/RoomAddScreen';
import RoomEditScreen from '../screens/RoomEditScreen';
// CUSTOMER 
import CustomerScreen from '../screens/CustomerScreen';
import CustomerAddScreen from '../screens/CustomerAddScreen';
import CustomerEditScreen from '../screens/CustomerEditScreen';
import UploadToFirebase from '../screens/UploadToFirebase';

import SettingScreen from '../screens/SettingScreen';

  
const StackCustomer = createStackNavigator({
    Customer: {
        screen: CustomerScreen,
        navigationOptions: {
            header: null,
        },
    },
    CustomerAdd: {
        screen: CustomerAddScreen,
        navigationOptions: {
            header: null,
        },
    },
    CustomerEdit: {
        screen: CustomerEditScreen,
        navigationOptions: {
            header: null,
        },
    },
})
const StackRoom = createStackNavigator({
    Room: {
        screen: RoomScreen,
        navigationOptions: {
            header: null,
        },
    },
    RoomAdd: {
        screen: RoomAddScreen,
        navigationOptions: {
            header: null,
        },
    },
    RoomEdit: {
        screen: RoomEditScreen,
        navigationOptions: {
            header: null,
        },
    },
})
const StackCheckin = createStackNavigator({
    Checkin: {
        screen: CheckinScreen,
        navigationOptions: {
            header: null,
        },
    },
    CheckinAdd: {
        screen: CheckinAddScreen,
        navigationOptions: {
            header: null,
        },
    },
    Checkout: {
        screen: CheckoutScreen,
        navigationOptions: {
            header: null,
        },
    },
})
const TabNavigator = createMaterialBottomTabNavigator({
    Checkin: { 
        screen: StackCheckin ,
        navigationOptions: {
            tabBarLabel : 'Checkin',
            tabBarIcon : ({tintColor}) =>(
                <View>
                    <Icon style={[{color: tintColor}]} size={25} name={'md-checkmark-circle'}/>
                </View>
            )
        }
    },
    Room: { 
        screen: StackRoom ,
        navigationOptions: {
            tabBarLabel : 'Room',
            tabBarIcon : ({tintColor}) =>(
                <View>
                    <Icon style={[{color: tintColor}]} size={25} name={'ios-bed'}/>
                </View>
            )
        }
    },
    Customer: { 
        screen: StackCustomer,
        navigationOptions: {
            tabBarLabel : 'Customer',
            tabBarIcon : ({tintColor}) =>(
                <View>
                    <Icon style={[{color: tintColor}]} size={25} name='person'/>
                </View>
            ),
            activeTintColor: '#e67e22',
            inactiveTintColor: '#222f3e',
        }
    },
    Setting: { 
        screen: SettingScreen,
        navigationOptions: {
            tabBarLabel : 'Setting',
            tabBarIcon : ({tintColor}) =>(
                <View>
                    <Icon style={[{color: tintColor}]} size={25} name='ios-settings'/>
                </View>
            ),
            activeTintColor: '#e67e22',
            inactiveTintColor: '#222f3e',
        }
    },
},
{
    initialRouteName:'Room',
    inactiveColor: '#222f3e',
    activeColor: '#e67e22',
    barStyle: {backgroundColor:'#ecf0f1'}
});


  const Auth = createStackNavigator(
    {    
        BottomStack:TabNavigator,
        Checkin:CheckinScreen,
        Room: RoomScreen,
        Cutomer: CustomerScreen,
        Setting: SettingScreen,

    },
    {
      initialRouteName: 'BottomStack',
      headerMode: 'none'
    }
  );

  export default createAppContainer(Auth);