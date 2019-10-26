import React, { Component } from 'react';
import {
StyleSheet,
Text,
View,
Image
} from 'react-native';

export default class Logo extends Component {

render(){
    return(
        <View style={styles.container}>
            <Image  style={{width:150, height: 150}}
                source={require('../../assets/logo.png')}/>
            <Text style={styles.logoText}>Clone Webtoon App.</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        marginTop:30,
        flexGrow: 1,
        // justifyContent:'center',
        alignItems: 'center'
    },
    logoText : {
        marginTop: 15,
        fontSize:18,
        color:'rgba(255, 255, 255, 0.7)'
    }
});