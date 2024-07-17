import { Text, View, Image } from 'react-native'
import React,{useEffect,useState} from 'react'
import {plantScreenStyle} from './PlantScreenStyle'
import Button from '../../Presentetional Components/Button/Button'
import { getCountDown } from '../../Utils/Utils'

const PlantScreen = ({navigation,route}) => {
  const {id, name, type, water, image, id_user, user} = route.params;
  const [countdown,setCountdown] = useState('')
  const goBack = () =>{navigation.navigate('Main',{id:id_user, username: user})} 
  const handleCountDown = () =>{
        const diff = getCountDown(id)
        setCountdown(diff)
  }
  useEffect(() => {
        const interval = setInterval(handleCountDown, 1000);
        return () => clearInterval(interval);
  }, []);
  return (
    <View style={plantScreenStyle.container}>
      <View style={plantScreenStyle.body_container}>
          <View style={plantScreenStyle.container_top}>
            <Text style={plantScreenStyle.headline}>{name}</Text>
          </View>
          <View style={plantScreenStyle.container_middle}>
            <Image style={plantScreenStyle.image} source={{uri:image === undefined ? require('../../blank.jpg') : image}} />
          </View>
          <View style={plantScreenStyle.container_bottom}>
            <View style={plantScreenStyle.collumn_line}>
              <Text style={plantScreenStyle.text}>{'type: ' + type}</Text> 
              <Text style={plantScreenStyle.text}>{countdown}</Text>
              <Text style={plantScreenStyle.text}>{'water: ' + water + 'ml'}</Text>          
            </View>          
            <Button name={'Go Back'} clickFunction={goBack} bttnStyle={plantScreenStyle.button} 
            bttnTouchedStyle={plantScreenStyle.button_touched}
            textStyle={plantScreenStyle.text} textTouchedStyle={plantScreenStyle.text_touched} />
          </View>
      </View>
    </View>
  )
}

export default PlantScreen

