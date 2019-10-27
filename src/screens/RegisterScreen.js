import React, { Component } from 'react';
import {
StyleSheet,
Text,
View,
StatusBar ,
TextInput,
TouchableOpacity
} from 'react-native';

import { Button } from 'native-base';
import Logo from '../components/Logo';
import axios from 'axios';
import AuthService from '../AuthService';
export default class RegisterScreen extends Component {
    constructor(){
        super();
        this.state ={
            username: 'vavan',
            email:'vavan@gmail.com',
            validate_email : false,
            password:'vavan',
            isSecureTextEntry:false,
            // fixEmail: 'irvan@gmail.com',
            // fixPassword : 'irvan',
            loading:false
        }
    }
    async componentDidMount(){
        if(await (new AuthService).exist()){
            this.props.navigation.navigate('ForYou')
        }
    }

    checkEmail = () =>{
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(this.state.email) === false) {
            alert("Email is Not Correct");
            this.setState({validate_email:false})
            return false;
        }
        else {
            this.setState({validate_email:true})
            this.checkLogin()
        }
    }
    checkLogin = async() =>{
        
        const auth = new (AuthService);
        const url = 'https://clowtoon-api.herokuapp.com/api/v1/register'
        await axios({
            method : 'POST',
            headers :{
                'content-type': 'application/json',
            },
            data : {
                username:this.state.username,
                email :this.state.email,
                password: this.state.password
            },
            url,
        }).then(async result =>{
            if(result.data.error){
                alert("Error to register")
            }else{
                const user = {
                    id:result.data.id,
                    token:result.data.token
                }
                await auth.save(user)
                this.props.navigation.navigate('ForYou');
                    
            }
        }).catch(error=>{
            console.log('errornya: ',error)
        })
    }
    showPassword=()=>{
        this.setState({
            isSecureTextEntry: !this.state.isSecureTextEntry
        })
    }
    render() {
        return(
            <View style={styles.container}>
                <Logo/>
                <View style={styles.form}>
                    <TextInput
                        style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Username"
                        placeholderTextColor="#ffffff"
                        selectionColor="#fff"
                        value={this.state.username}
                        onChangeText = {(text)=>{
                            this.setState({
                                username:text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.inputBox}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        autoCapitalize="none"
                        placeholder="Email"
                        placeholderTextColor="#ffffff"
                        selectionColor="#fff"
                        keyboardType="email-address"
                        value={this.state.email}
                        onChangeText = {(text)=>{
                            this.setState({
                                email:text
                            })
                        }}
                    />
                    <TextInput 
                        autoCapitalize="none"
                        style={styles.inputBox}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Password"
                        value={this.state.password}
                        secureTextEntry={!this.state.isSecureTextEntry}
                        onChangeText={(text)=>{
                            this.setState({
                                password:text
                            })
                        }}
                    >
                    </TextInput>
                    {/* <TouchableOpacity onPress={this.showPassword}>
                        <Icon 
                            style={{marginTop:15, fontSize:33, paddingHorizontal:5, borderRadius:5}}
                            name={this.state.isSecureTextEntry ? 'eye': 'eye'}></Icon>
                    </TouchableOpacity> */}
                    
                    <Button block info style={styles.button} onPress={()=> this.checkEmail()}>
                        <Text style={{justifyContent:'center', color:'white'}}>Sign Up</Text>
                    </Button>
                </View>
                <View style={styles.signupTextCont}>
                <Text style={styles.signupText}>Already have an account?</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Login")}><Text style={styles.signupButton}> Sign in</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'#455a64',
        flex: 1,
        alignItems:'center',
        justifyContent :'center'
    },
    form : {
        marginTop:-50,
        flexGrow: 1,
        // justifyContent:'center',
        alignItems: 'center'
    },
    inputBox: {
        width:300,
        height:45,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical: 10
    },
    button: {
        width:300,
        backgroundColor:'#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
    },
    signupTextCont : {
        flexGrow: 1,
        alignItems:'flex-end',
        justifyContent :'center',
        paddingVertical:16,
        flexDirection:'row'
    },
    signupText: {
        color:'rgba(255,255,255,0.6)',
        fontSize:16
    },
    signupButton: {
        color:'#ffffff',
        fontSize:16,
        fontWeight:'500'
    }
});
