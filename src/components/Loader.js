import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

export default class Loader extends Component{  
    constructor(props) {    
        super(props);    
        this.state = { visible: false };  
    }
    handlePress = () => {    
        setTimeout(() => {      
            this.setState({         
                visible: !this.state.visible,      
            });    
        }, 1000);  
    };
    render() {    
        const { visible } = this.state;
        return (      
            <View style={styles.container}>        
                <AnimatedLoader 
                    visible={visible}          
                    overlayColor="rgba(255,255,255,0.75)"          
                    animationStyle={styles.lottie}          
                    speed={1}        
                />    
            </View>    
        );  
    }
}
const styles = StyleSheet.create({  
    container: {    
        flex: 1,    
        justifyContent: 'center',    
        alignItems: 'center',    
        backgroundColor: '#F5FCFF',  
    },  
    lottie: {    
        width: 100,    
        height: 100,  
    },
});