import { View } from 'react-native'
import React,{useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { filterStyle } from '../../../Utils/MaterialUIStyles';
import { IconButton } from '@mui/material';
import Input from '../../../Presentetional Components/Input/Input';
import { searchBarStyles } from './SearchBarStyle';


const SearchBar = ({inputChange,searchFunction,user,navigation}) => {
  const [input, setInput] = useState('')
  const handleInput = (event) =>{
    setInput(event)
    inputChange(event)
  }
  const search = () =>{
    const data = searchFunction()
    if(data.length > 0){
      navigation.navigate('PlantScreen',{id:data[0].id, name:data[0].name, type:data[0].type,
      water: data[0].water,image:data[0].image, id_user:data[0].id_user, user: user})
    }
  }
  return (
    <View style={searchBarStyles.container}>
      <Input text={input} setText={handleInput} placeholder={'Search...'} styleBlur={searchBarStyles.input} styleFocus={searchBarStyles.input_focus}/>
      <IconButton onClick={search}>
        <SearchIcon sx={filterStyle}/>
      </IconButton>
    </View>
  )
}

export default SearchBar