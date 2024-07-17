import { View } from 'react-native'
import {searchListStyle } from './SearchListStyle'
import SearchResult from '../../Simple Container Components/SearchResult/SearchResult'
import React from 'react'

const SearchList = ({user,data,navigation}) => {
  const selectedFunction = (index) =>{navigation.navigate('PlantScreen',{id:data[index].id, name:data[index].name, type:data[index].type,
    water: data[index].water,image:data[index].image, id_user:data[index].id_user, user: user})};
  const getData = () =>{
    if(data.length === 0)
      return (<SearchResult />)
    return (data.map((item, index) =>(<SearchResult key={index} name={item.name} url={item.image} selectedFunction={() =>selectedFunction(index)} />))) 
  }
  return (
    <View style={searchListStyle.search_results}>
      {getData()}
    </View>
  )
}

export default SearchList
