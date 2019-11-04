import React, {useState, useEffect} from 'react';
import {ScrollView, Alert, View, Image, AsyncStorage, StyleSheet} from 'react-native';
import socketio from 'socket.io-client';
import SpotList from '../component/spotList';

import logo from '../assets/logo.png';
export default function List({navigation}){
    const[techs, setTechs] = useState([]);
    useEffect(() =>{
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.15.6:3333', {
                query: {user_id}
            });
            socket.on('booking_response', booking =>{
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'Aprovada' : 'Rejeitada'}`)
            });
        }); 
    }, []);

    useEffect(()=>{
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
        
    }, []);

    return(
        <View style={style.container}>
            <Image style={style.logo} source={logo}/>
           <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
            </ScrollView>
          
        </View>
      
    );
}

const style = StyleSheet.create({
    container:{
        flex: 1,
     },
    logo:{
        height:32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical:30,
    }
});