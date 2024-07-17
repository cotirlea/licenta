import { View,Image,Text } from 'react-native'
import { plantStyles } from './PlantStyle'
import React,{useState} from 'react'
import Button from '../../../Presentetional Components/Button/Button'

const Plant = ({ id, name, image, deleteFunction, infoFunction, navigation, user }) => {
    const remove = () => {deleteFunction(id)};
    const info = () => {const plantInfo = infoFunction(id);
      navigation.navigate('PlantScreen',{id:plantInfo.id, name:plantInfo.name, type:plantInfo.type,
      water: plantInfo.water,image:plantInfo.image, id_user:plantInfo.id_user, user: user})};
    
      return (
      <View style={plantStyles.container}>
        <View style={plantStyles.container_top}>
          <Text style={plantStyles.headline}>{name === undefined ? 'undefined' : name}</Text>
        </View>
        <View style={plantStyles.container_middle}>
          <Image style={plantStyles.image} source={{uri:image === undefined ? require('../../../blank.jpg') : image}} />
        </View>
        <View style={plantStyles.container_bottom}>
          <Button name={'Info'} clickFunction={info} bttnStyle={plantStyles.button} bttnTouchedStyle={plantStyles.button_touched} textStyle={plantStyles.text} textTouchedStyle={plantStyles.text_touched} />        
          <Button name={'Remove'} clickFunction={remove} bttnStyle={plantStyles.button} bttnTouchedStyle={plantStyles.button_touched} textStyle={plantStyles.text} textTouchedStyle={plantStyles.text_touched} />        
        </View>
      </View>
    );
}

export default Plant;