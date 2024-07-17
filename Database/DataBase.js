import {getPlantUtil,createIdPlant, createIdUser, getPlantsUtil,takeImage, addPlantUtil,predictImage} from '../Utils/Utils'
import { deleteImage } from './firebase';

const url = 'http://localhost:3000';

const addTemplate = async (url, data) =>{
    const response = await fetch(url, {method: 'PUT',headers: {'Content-Type': 'application/json'},body: JSON.stringify(data),});
    console.log(response)
    if(!response.ok)
        throw new Error('Network response was not ok');
    if(response.status === 200)
        return data
    else
        return null
}
const removeTemplate = async (url, data) => {
    const response = await fetch(url, {method: 'DELETE',headers: {'Content-Type': 'application/json',},body: JSON.stringify(data),});
    if (!response.ok) 
        throw new Error('Network response was not ok');
    return response.json();
};
const getTemplate = async (url) =>{
    const response = await fetch(url, {method: 'GET',headers: {'Content-Type': 'application/json',},});
    if(!response.ok)
        throw new Error('Network response was not ok');
    const d = await response.json();
    if(d.length === 0)
        return null
    else
        return d
}

const addSimplified = async (url_extension, data) =>{
    const call_url = url + '/' + url_extension;
    const response = await addTemplate(call_url,data)
    return response
}

const removeSimplified = async (url_extension, data) => {
    const call_url = url + '/' + url_extension;
    const response = await removeTemplate(call_url, data);
    return response;
};

const getSimplified = async(url_extension, data)=>{
    let call_url = url + '/' + url_extension + '/' + data
    const response = await getTemplate(call_url)
    return response
}

const addUser = async (username, password) => {
    const id = createIdUser();
    return addSimplified('addUser',{id:id,username:username,password:password})
}
const removeUser = async (id) =>{
    return removeSimplified('removeUser',{id:id})
}
const getUser = async (username) =>{
    const user = await getSimplified('getUser',username);
    return user !== null ? user[0] : null;
}
const addPlantDataBase = async (model, id_user,image) =>{const id = createIdPlant();const prediction = await predictImage(model,image.uri)
const p = await addSimplified('addPlant',{id:id, name:prediction.name, water:prediction.water, type:prediction.type, id_user:id_user});return addPlantUtil(p,image.uri)}
const addPlant = async(model, id_user, setLoading,add) =>{setLoading(true);const image = await takeImage();setLoading(false);setLoading(true);const k = await addPlantDataBase(model,id_user,image);await add(k);setLoading(false);}
const removePlant = async (id) =>{await deleteImage(id);return removeSimplified('removePlant',{id:id})}
const removePlants = async (id_user) =>{return removeSimplified('removePlants',{id_user:id_user})}
const getPlant = async (id) =>{const p = await getSimplified('getPlant',id); return getPlantUtil(p[0]);}
const getPlants = async (id_user) =>{const data = await getSimplified('getPlants',id_user);return getPlantsUtil(data)}

export {addUser, removeUser, getUser, addPlant, removePlant, removePlants, getPlant, getPlants,predictImage};

