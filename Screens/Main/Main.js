import { View,Text,ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import Plant  from '../../Container Components/Complex Container Components/Plant/Plant'
import { getPlants, addPlant,removePlant } from '../../Database/DataBase'
import { mainStyles } from './MainStyle'
import Header from '../../Composite Components/Complex Composite Components/Header'
import { getSearchData,getFilterData,uniqueTypes, getById } from '../../Utils/Utils'
import * as tf from '@tensorflow/tfjs'
import Loading from '../Loading/Loading'


const Main = ({ navigation, route }) => {
    const { id, username} = route.params;
    const [data,setData] = useState({initial:[],value:[]})
    const [types,setTypes] = useState([])
    const [model,setModel] = useState(null)
    const [loading,setLoading] = useState(false);
    const handleTypes = (arr) => {const uniq = uniqueTypes(arr); setTypes(uniq)}
    const add = (elem) =>{let k = [...data.initial]; k.splice(0,0,elem); setData({initial:k,value:k});handleTypes(k);}
    const getData = async () =>{setLoading(true);const d = await getPlants(id);setData({initial:d,value:d});handleTypes(d);const m = await tf.loadGraphModel('/tfjs_model/model.json');console.log(m);setModel(m);setLoading(false);}
    const searchFunction = e =>{let new_arr = getSearchData(data.initial, 'name', e);setData({ ...data, value: new_arr });return new_arr}
    const filterFunction = e =>{let new_arr = getFilterData(data.initial, 'type', e);setData({ ...data, value: new_arr });return new_arr}
    const create = async () =>{const k = await addPlant(model,id,setLoading,add);}
    const remove = async (id) =>{setLoading(true);const newData = data.initial.filter(item => item.id !== id);setData({initial:newData,value:newData});await removePlant(id);handleTypes(newData);setLoading(false);}
    const info = (id) =>{return getById(data.initial,id);}
    useEffect(() =>{
      getData();
    },[])

   return (
      <View style={mainStyles.container}>
        <Header create={create} user={username} searchFunction={searchFunction} typeList={types} filterFunction={filterFunction} navigation={navigation} />
        <ScrollView style={mainStyles.scrollView}>
          <View style={mainStyles.scrollView_helper}>
            {data.value.length === 0 ? <Text style={mainStyles.empty_main}>Empty</Text> :
              data.value.map((item,index) =>(
                <Plant key={index} id={item.id} name={item.name} image={item.image} deleteFunction={remove} infoFunction={info} navigation={navigation} user={username} />
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
}

export default Main