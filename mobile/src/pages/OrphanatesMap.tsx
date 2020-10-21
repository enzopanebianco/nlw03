import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import Local from '../images/Local.png';
import {Feather} from '@expo/vector-icons';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage{
  id:number;
  name:string;
  latitude:number;
  longitude:number;
}

export default function OrphanatesMap() {
  const navigation = useNavigation();
  const [orphanages,setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(()=>{
    api.get('/orphanages').then(res=>{
      setOrphanages(res.data);
    })
  });

  function handleNavigate(id:number) {
    navigation.navigate('OrphanageDetails',{id});
  }
  function handleNavigateToOrphanage() {
    navigation.navigate('SelectMapPosition');
  }
 

  
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map} initialRegion={{
          latitude: -23.5525101,
          longitude: -46.5644216,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}>

        {orphanages.map(orphanage=>{
          return (
        <Marker 
        key={orphanage.id}
        calloutAnchor={{
          x:2.7,
          y:0.8
        }}
        icon={Local} coordinate={{
          latitude: orphanage.latitude,
          longitude: orphanage.longitude,
          
        }} >

          <Callout tooltip={true} onPress={()=>handleNavigate(orphanage.id)} >
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>{orphanage.name}</Text>
            </View> 
          </Callout>
        </Marker>
          );
        })}
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
        <RectButton style={styles.create} onPress={handleNavigateToOrphanage}>
          <Feather name='plus' size={20} color="#fff" />

        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer:{
    width:160,
    height:46,
    paddingHorizontal:16,
    backgroundColor:"rgba(255,255,255,0.8)",
    borderRadius:16,
    elevation:3,
    justifyContent:'center',
  },
  calloutText:{
    color:'#0089a5',
    fontSize:14,
    fontFamily:'Nunito_700Bold',

  },
  footer:{
    position:'absolute',
    left:24,
    right:24,
    bottom:32,
    backgroundColor:'#fff',
    borderRadius:28,
    height:46,
    paddingLeft:24,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    elevation:3,
    
  },
  footerText:{
    color:'#8fa7b3',
    fontFamily:'Nunito_700Bold',
  },
  create:{
    width:56,
    height:56,
    backgroundColor:'#15c3d6',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
  },
});
