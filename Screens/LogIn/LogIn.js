import { Text, View} from 'react-native'
import { logInStyles } from './LogInStyles'
import React,{useState} from 'react'
import Button from '../../Presentetional Components/Button/Button'
import Input from '../../Presentetional Components/Input/Input'
import Switch from '../../Container Components/Simple Container Components/Switch/Switch'
import { validateLogIn,validateSignIn } from '../../Helper Classes/LogInValidator'
import Erorr from '../Error/Erorr'
import { getUser,addUser } from '../../Database/DataBase'
import Loading from '../Loading/Loading'

const LogIn = ({ navigation }) => {
    const [isLogIn,setLogIn] = useState(true)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [confirm,setConfirm] = useState('')
    const [errors,setErrors] = useState([])
    const [loading, setLoading] = useState(false);

    const validate = async () =>{
        if(isLogIn)
            return await validateLogIn(username,password)
        return await validateSignIn(username,password,confirm)
    }

    const retriveUser = async () =>{
        if(isLogIn)
            return await getUser(username,password)
        return await addUser(username,password)
    }

    const submit = async () =>{
        setLoading(true)
        let err = await validate();
        if(err.length > 0)
          setLoading(false)          
        setErrors(err);
        if(err.length === 0){
            const user = await retriveUser()
            navigation.navigate('Main',{id:user.id, username:user.username})
            setLoading(false)
        }
    }

    const getBody = () =>{
    return(
        <View style={logInStyles.body_container_log}>
            <View style={logInStyles.title_container_log}>
                <Text style={logInStyles.title_text_log}>WELCOME !</Text>
            </View>
            <Switch change={isLogIn} setChange={setLogIn} />
            <View style={logInStyles.input_container_log}>
                <Input text={username} setText={setUsername} placeholder={'username'} />
                <Input text={password} setText={setPassword} placeholder={'password'} />
                {isLogIn ? null : <Input text={confirm} setText={setConfirm} placeholder={'confirm password'} />}
            </View>
           < Button clickFunction={submit} bttnStyle={logInStyles.button_log} bttnTouchedStyle={logInStyles.button_log_touched} textStyle={logInStyles.text_log} textTouchedStyle={logInStyles.text_log_touched} />
        </View>
    )
    }

    if (loading) {
        return <Loading />;
    }    

    return (
        <View style={logInStyles.container_log}>
            {errors.length === 0 ? getBody() : <Erorr erros={errors} setErrors={setErrors} />}
        </View>
    )
}

export default LogIn