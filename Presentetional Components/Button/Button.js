import { Pressable, Text } from "react-native";
import React,{useState} from "react";

const Button = ({name,clickFunction,bttnStyle,bttnTouchedStyle,textStyle,textTouchedStyle}) => {
    const [touch,setTouch] = useState(false)
    const handleTouch = () => {
        setTouch(true);
        setTimeout(() => {
          setTouch(false);
        }, 200);
        clickFunction();
    };

  return (
    <Pressable style={!touch ? bttnStyle : bttnTouchedStyle} onPress={handleTouch}>
        <Text style={!touch? textStyle : textTouchedStyle}>{name === undefined ? 'Confirm' : name}</Text>
    </Pressable>
  )
}

export default Button