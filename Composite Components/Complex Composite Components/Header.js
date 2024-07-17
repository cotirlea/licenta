import { Text, View } from 'react-native'
import { headerStyle } from './HeaderStyle'
import Button from '../../Presentetional Components/Button/Button'
import React from 'react'
import Search  from '../../Composite Components/Simple Composite Components/Search'
import FilterList from '../../Container Components/Simple Container Components/FilterList/FilterList'

const Header = ({create,user,searchFunction,typeList,filterFunction,navigation}) => {
  const logOut = () =>{navigation.navigate('LogIn')}
  return (
    <View style={headerStyle.container}>
      <View style={headerStyle.segment_container}>
        <Button name={'Create'} clickFunction={create} bttnStyle={headerStyle.bttn} bttnTouchedStyle={headerStyle.bttn_touched} textStyle={headerStyle.text} textTouchedStyle={headerStyle.text_touched} />
        <Search user={user} searchFunction={searchFunction} navigation={navigation} />
      </View>
      <Text style={headerStyle.title}>{user}</Text>
      <View style={headerStyle.segment_container}>
        <FilterList typeList={typeList} filterFunction={filterFunction} />
        <Button name={'Log Out'} clickFunction={logOut} bttnStyle={headerStyle.bttn} bttnTouchedStyle={headerStyle.bttn_touched} textStyle={headerStyle.text} textTouchedStyle={headerStyle.text_touched} />
      </View>
    </View>
  )
}

export default Header

