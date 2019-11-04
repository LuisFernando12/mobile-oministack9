import React,{useState, useEffect} from 'react';
import {Text, View,StyleSheet, Image, FlatList, TouchableOpacity} from 'react-native';
import{withNavigation} from 'react-navigation';


import api from '../services/api'

 function SpotList({tech, navigation}){
    const [spots, setSpots] = useState([]);
    
    useEffect(()=>{
       async function loadSpots(){
           const response = await api.get('/spots',{
               params:{ tech }
           })
           setSpots(response.data);
       }

       loadSpots();
   }, []);

   function handleNavigate(id){
       
       navigation.navigate('Book' , { id })
   }
    return (
    <View style={style.container}>
        <Text style={style.title}>Empresas que usam  <Text style= {style.bold}>{tech}</Text> </Text>
        <FlatList
            style={style.list}
            data={spots}
            keyExtractor={spot => spot._id}
            horizontal
            showsVerticalScrollIndicator={false}
            renderItem={({item})=>(
                <View style={style.listItem}>
                    <Image style={style.thumbnail} source={ { uri:item.thumbnail_url.replace('localhost','192.168.15.6')} }/>
                    <Text style={style.company}>{item.company }</Text>
                    <Text style={style.price}>{item.price ? `R$${item.price}/dia`: 'Gratuito'}</Text>
                    <TouchableOpacity onPress={()=>handleNavigate(item.id)} style={style.button}>
                        <Text style={ style.buttonText}>Solicitar reserva</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
   </View>
 )}
 const style = StyleSheet.create({
    container:{
        marginTop:30,
    },
     title:{
        fontSize: 20,
        color:'#444',
        paddingHorizontal:20,
        marginBottom:15,
     },
     bold:{
         fontWeight:'bold',
     },
     list:{
         paddingHorizontal:20,
     },
     listItem:{
         flex:1,
         marginRight:15,
     },
     thumbnail:{
         width:200,
         height:120,
         resizeMode:'cover',
     },
     company:{
         fontSize:24,
         fontWeight:'bold',
         color:'#333',
         marginTop:10,
     },
     price:{
         fontSize:15,
         color:'#999',
         marginTop:5
     },
     button:{
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:2,
        marginTop:10,
        marginBottom:5,
    },
    buttonText: {
        color:'#fff',
        fontWeight:'bold',
        fontSize:15,
    }
 });

 export default withNavigation(SpotList);