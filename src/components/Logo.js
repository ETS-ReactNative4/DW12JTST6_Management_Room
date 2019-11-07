import React, { Component } from 'react';
import {
StyleSheet,
Text,
View,
Image,
KeyboardAvoidingView,
} from 'react-native';

export default class Logo extends Component {

render(){
    return(
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
            <Image  style={{width:200, height: 200}}
                source={require('../../assets/logo.png')}/>
        </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        // marginTop:30,
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
});