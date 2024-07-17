import { Text, View } from 'react-native'
import { errorStyle } from './ErrorStyle'
import Button from '../../Presentetional Components/Button/Button'
import React from 'react'

const Erorr = ({erros,setErrors}) => {
    const close = () => {setErrors([])}
  return (
    <View style={errorStyle.container_err}>
      <View style={errorStyle.title_container_err}>
        <Text style={errorStyle.title_err}>Errors:</Text>
      </View>
      <View style={errorStyle.list_container_err}>
        {erros.map((item) =>(
            <View style={errorStyle.elem_err}>
                <Text style={errorStyle.text_err}>{item}</Text>
            </View>
        ))}
        <Button clickFunction={close} bttnStyle={errorStyle.button_err} bttnTouchedStyle={errorStyle.button_err_touched} textStyle={errorStyle.text_err} textTouchedStyle={errorStyle.text_err_touched} />
      </View>
    </View>
  )
}

export default Erorr