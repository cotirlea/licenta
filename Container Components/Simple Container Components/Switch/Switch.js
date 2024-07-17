import { switchStyles } from './SwitchStyle';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';

const Switch = ({change,setChange}) => {
  const handleChange = () =>{setChange(!change)}
  const sliderPosition = change ? 4 : 70;

  return (
    <View style={switchStyles.switch_container}>
      <Text style={switchStyles.switchText}>LOG IN</Text>
      <TouchableOpacity style={switchStyles.switch} onPress={handleChange} >
        <View style={[switchStyles.slider, { transform: [{ translateX: sliderPosition }] }]} />
      </TouchableOpacity>
      <Text style={switchStyles.switchText}>SIGN IN</Text>
    </View>
  );
};

export default Switch;