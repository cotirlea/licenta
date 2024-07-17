import { Text, View,Image,Pressable } from 'react-native'
import { searchResultStyle } from './SearchResultStyle'
import React from 'react'

const SearchResult = ({name,url,selectedFunction}) => {
  const select = () =>{selectedFunction(name)}
  return (
    <Pressable onPress={select}>
      <View style={searchResultStyle.search_result_container} >
        {name === undefined ? <Text style={searchResultStyle.search_result_empty}>No result...</Text> : 
        <Text style={searchResultStyle.search_result_name}>{name}</Text>}
        {url === undefined ? null : <Image style={searchResultStyle.search_result_image} source={{uri:url}} />} 
      </View>
    </Pressable>
  )
}

export default SearchResult