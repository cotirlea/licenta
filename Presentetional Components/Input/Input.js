import { TextInput } from 'react-native'
import { inputStyles } from './InputStyle'
import React,{useState} from 'react'

const Input = ({text,setText,placeholder,styleFocus,styleBlur}) => {
    const [focus,setFocus] = useState(false)
    const handleText = e =>{setText(e.target.value)}
    const handleFocus = () =>{setFocus(true)}
    const handleBlur = () =>{setFocus(false)}
    const getStyleFocus = () => styleFocus === undefined ? inputStyles.input_focuse : styleFocus;
    const getStyleBlur = () => styleBlur === undefined ? inputStyles.input : styleBlur;

  return (
    <TextInput onFocus={handleFocus} onBlur={handleBlur} style={focus ? getStyleFocus() : getStyleBlur()} placeholder={placeholder} value={text} onChange={handleText} placeholderTextColor={'#696969'} /> 
  )
}

export default Input