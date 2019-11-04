import React, {useState, useEffect}from 'react';
import {Text, KeyboardAvoidingView, AsyncStorage, Platform, View,TextInput, Image, TouchableOpacity, StyleSheet} from 'react-native';

import api from '../services/api'
import logo from '../assets/logo.png';

export default function Login({ navigation }){
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');
    useEffect(()=>{
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List');
            }
        })
    },[]);
    async function handleSubmit(){
        const response = await api.post('/sessions',{
            email
        });
        
        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs',techs);

        navigation.navigate('List');
        

    }
    return(
        <KeyboardAvoidingView behavior="padding" style={style.cotainer}>
           <Image source={logo}/>

             <View style={style.form}>
                    <Text style={style.label}>Seu e-mail *</Text>
                    <TextInput
                        style={style.input}
                        placeholder="Seu E-mail"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={style.label}>Tecnologias *</Text>
                    <TextInput
                        style={style.input}
                        placeholder="Tecnologias"
                        placeholderTextColor="#999"
                        autoCapitalize='words'
                        autoCorrect={false}
                        value={techs}
                        onChangeText={setTechs}
                    />

                    <TouchableOpacity onPress={handleSubmit} style={style.button}>
                         <Text style={style.buttonText}> Encontrar spots </Text>
                    </TouchableOpacity>
            </View>
    </KeyboardAvoidingView>
    );
}

const style = StyleSheet.create({
    cotainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    form:{
        alignSelf:'stretch',
        paddingHorizontal:30,
        marginTop:30,
    },
    label:{
        fontWeight:'bold',
        color:'#444',
        marginBottom:8,
    },
    input:{
        borderWidth:1,
        borderColor:'#ddd',
        paddingHorizontal:20,
        fontSize:16,
        color:'#444',
        height:44,
        marginBottom:20,
        borderRadius:2,
    },
    button:{
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent:'center',
        alignItems:'center',
    },
    buttonText: {
        color:'#fff',
        fontWeight:'bold',
        fontSize:16,
    }
});