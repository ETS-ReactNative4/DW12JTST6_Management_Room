import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import { Button, Icon, Spinner } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import Logo from '../components/Logo';
import AuthService from '../AuthService';
import * as URL from '../../ENV_URL';

export default class LoginScreen extends Component {
    constructor(){
        super();
        this.state ={
            email:'dinda@gmail.com',
            validate_email : false,
            password:'dinda',
            isSecureTextEntry:false,
            // fixEmail: 'irvan@gmail.com',
            // fixPassword : 'irvan',
            loading:false
        }
    }

    async componentDidMount(){
        if(await (new AuthService).exist()){
            this.props.navigation.navigate('Room')
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
        const url = 'http://192.168.43.233:4000/api/v2/login';
        await axios({
            method : 'POST',
            headers :{
                'content-type': 'application/json',
            },
            data : {
                email :this.state.email,
                password: this.state.password
            },
            url,
        }).then(async result =>{
            console.log("RSULT : "+result.data)
            if(result.data.error){
                alert("incorrect username and password")
            }else{
                const user = {
                    // id:result.data.id.toString(),
                    token:result.data.token
                }
                await auth.save(user)
                this.props.navigation.navigate('Room');
                    
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
    render(){
        return (   
            <View style={styles.container}>
                <Logo/>
                <View style={styles.form}>
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
                        <Text style={{justifyContent:'center', color:'white'}}>Login</Text>
                    </Button>

                </View>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Dont have an account yet?</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate("Register")}>
                        <Text style={styles.signupButton}> Signup</Text>
                    </TouchableOpacity>
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
        // justifyContent :'center'
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
})