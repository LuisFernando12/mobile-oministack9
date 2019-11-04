import React, { useState } from 'react';
import {Image,Alert, Text, View, TextInput, TouchableOpacity, AsyncStorage, StyleSheet} from 'react-native';
import logo from '../assets/logo.png';
import Api from '../services/api';
export default function Book( {navigation} ){
const [date, setDate ] = useState('');
const id = navigation.getParam('id');

async function handleSubmit(){
    const user_id = await AsyncStorage.getItem('user');
    await Api.post(`/spots/${id}/bookings`,{ date }, {
        headers: {user_id}
    });
    Alert.alert('Solicitação de reserva cadasrtada com sucesso!!!');
     navigation.navigate('List');
    
}

    function handleCancel(){
        navigation.navigate('List');  
    }
    return(
        <View style={style.cotainer}>
            <Image source={logo} style={style.logo}/>
            <Text style={style.label}> Data de interesse *</Text>
                        <TextInput
                            style={style.input}
                            placeholder="Qual data você deja reservar?"
                            placeholderTextColor="#999"
                            autoCapitalize='words'
                            autoCorrect={false}
                            value={date}
                            onChangeText={setDate}
                         />

                    <TouchableOpacity onPress={()=>handleSubmit()} style={style.button}>
                         <Text style={style.buttonText}> Solicitar Reservar </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleCancel} style={[style.button, style.cancelButton]}>
                         <Text style={style.buttonText}> Cancelar </Text>
                    </TouchableOpacity>
        </View>
    );
}
const style = StyleSheet.create({
    cotainer:{
        margin:30,
        paddingHorizontal:10,
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
    },
    logo:{
        alignSelf:'center',
        marginTop:20,
    },
    cancelButton:{
        marginTop:10,
        backgroundColor:'#ccc'
    }
});