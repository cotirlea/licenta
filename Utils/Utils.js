import * as tf from '@tensorflow/tfjs';
import * as ImagePicker from 'expo-image-picker';
import {addImage,getImage,deleteImage} from '../Database/firebase'


function findIndexOfMaxNumber(arr) {
  let maxIndex = 0; 
  let maxValue = arr[0]; 
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxValue) {
      maxValue = arr[i];
      maxIndex = i;
    }
  }
  return maxIndex;
}

const convertUriToTensor = (uri) =>{
    const img = new Image();
    img.src = uri;

    return new Promise((resolve) => {
      img.onload = () => {
        const tensor = tf.browser.fromPixels(img)
          .resizeNearestNeighbor([224, 224]) // change the size to match your model's input shape
          .toFloat()
          .expandDims();
        resolve(tensor);
      };
    });
}

const getPlant = async (index) =>{
    try {
        const response = await fetch('/data.txt');
        let text = await response.text();
        text = text.split('\n')
        let line = text[index].split('|').map(item => item.trim());
        const data = {name: line[0], type: line[1], water: line[2]}
        return data
    } catch (error) {
      console.error('Error reading file:', error);
    }
}


const predictImage = async (model,uri) =>{
    if (model && uri) {
      const tensor = await convertUriToTensor(uri);
      const predictions = await model.predict(tensor).data();
      console.log(predictions)
      const index = findIndexOfMaxNumber(predictions)
      return getPlant(index)
    }
}

const addZero = (elem) =>{
    if(elem < 10)
        return '0' + elem
    return elem
}

const createIdUser = () =>{
    let d = new Date();
    let id = '' + d.getFullYear() + addZero(d.getMonth()) + addZero(d.getDate()) + addZero(d.getHours()) + addZero(d.getMinutes()) + addZero(d.getSeconds()) + 'u';
    return id;
}

const createIdPlant = (type) =>{
    let d = new Date();
    let id = '' + d.getFullYear() + addZero((d.getMonth() + 1)) + addZero(d.getDate()) + addZero(d.getHours()) + addZero(d.getMinutes()) + addZero(d.getSeconds()) + 'p';
    if(type === 'jpeg')
        id = id + 'j'
    else
        id = id + 'p'
    return id;
}

const getPlantUtil = async (p) =>{
    const image = await getImage(p.id)
    const plant = {id: p.id, name: p.name, water: p.water, type: p.type, id_user: p.id_user, image : image}
    return plant; 
}

const getPlantsUtil = async (data) =>{
    let plants = []
    if(data === null) return []
    for(let i=0;i<data.length;i++){
        const plant = await getPlantUtil(data[i])
        plants.splice(0,0,plant)
    }
    return plants
}

const addPlantUtil = async (p,file) =>{
    await addImage(file,p.id)
    return getPlantUtil(p)
}

const removePlantUtil = async(id) =>{await deleteImage(id)}

const removePlantsUtil = async(data) =>{
    for(let i = 0;i<data.length;i++){
        await removePlantUtil(data[i].id)
    }
}

const getTypes = (data) =>{
     let types = [];
    data.forEach(item => {
        if (!types.includes(item.type)) {
            types.push(item.type);
        }
    });
    return types;
}


const takeImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permission denied');
        return;
    }
    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
    });
    if (!result.canceled) {
        return result.assets[0];
    }

    return null;
};

const filterCriteria = (item, field, type) =>{
  if(type === '' || type === 'unspecified')
    return true
  else
    return item[field] === type
}

const searchSingular = (item, search) =>{return item.startsWith(search)}

const searchMultiple = (item, search) =>{
    let substrings = item.split(" ")
    for(let i=0;i<substrings.length;i++){
        if(searchSingular(substrings[i], search) === true)
            return true
    }
    return false
}

const searchCriteria = (item, field, search) => {return searchMultiple(item[field], search)};

const getModifiedData = (data, field, condition, conditionRule) =>{
  let new_data = []
  for(let i=0;i<data.length;i++){
    if(conditionRule(data[i], field, condition) === true)
      new_data.push(data[i])
  }
  return new_data
}

const getFilterData = (data, field, type) =>{return getModifiedData(data, field, type, filterCriteria)}
const getSearchData = (data, field, search) =>{return getModifiedData(data, field, search, searchCriteria)}

const uniqueTypes = (arr) =>{
    const uniqueValues = new Set();
    arr.forEach(item => {uniqueValues.add(item['type']);});
    uniqueValues.add('unspecified')
    return Array.from(uniqueValues);
}

const getCreationDate = (id) =>{
    const hour = id.slice(8,10);
    const minutes = id.slice(10,12);
    const seconds = id.slice(12,14);
    return new Date(0,0,1,hour,minutes,seconds,0)
}

const getcurrentDate = () =>{
    const current = new Date();
    const hour = current.getHours();
    const minutes = current.getMinutes();
    const seconds = current.getSeconds();
    return new Date(0, 0, 0, hour, minutes, seconds, 0);

}

const getDiff = (id) =>{
    const creation = getCreationDate(id)
    const current = getcurrentDate()
    const diff = Math.abs(current.getTime() - creation.getTime())
    return  new Date(diff)
}

const getCountDown = (id) =>{
    const diff = getDiff(id)
    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;
    return hours + ':' + minutes + ':' + seconds;
}

const getById = (data,id) =>{return data.find(item => item.id === id) || null;}

export {createIdUser, createIdPlant,addPlantUtil,getPlantUtil,getPlantsUtil,removePlantUtil,removePlantsUtil,getTypes,takeImage,getFilterData,getSearchData,uniqueTypes,getCountDown,getById,predictImage}