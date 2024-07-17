import { View } from 'react-native'
import React, {useState,useEffect, useRef} from 'react'
import SearchList from '../../Container Components/Complex Container Components/SearchList/SearchList'
import SearchBar from '../../Container Components/Complex Container Components/SearchBar/SearchBar'

const Search = ({user, searchFunction, navigation}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  const handleClickOutside = (event) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target))
      setShowDropdown(false);
  };

  const inputChage = async (val) =>{
    let searchRez = await searchFunction(val)
    setSearchResults(searchRez)
  }
  const searchF = () =>{return searchResults}
  return (
    <View>
      <View onFocus={() => setShowDropdown(true)} ref={searchContainerRef}>
        <SearchBar inputChange={inputChage} searchFunction={searchF} user={user} navigation={navigation}/>
        {showDropdown === true ?  <SearchList user={user} data={searchResults} navigation={navigation} /> :null}
      </View>
    </View>
  )
}

export default Search