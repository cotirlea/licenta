import { getUser } from "../../myproject/Database/DataBase";

const validateString = (str, field, errors) =>{
    if(str.length === 0)
        errors.push(field + ' is empty')
    if (str.length > 0 && str.length < 4)
        errors.push(field + ' is too short')
    return errors;
}

const validateInput = async (username, password, isLogIn, errors) =>{
    const user = await getUser(username)
    if(user === null){
        if(isLogIn){errors.push('user doesnt exist');return errors;}
        return errors;
    }
    else{
        if(!isLogIn){errors.push('user already exists');return errors}
        if(user.password !== password){errors.push('password incorect')}
    }
    return errors
}

const validateLogIn = (username, password) =>{
    let errors = []
    errors = validateString(username, 'username', errors)
    errors = validateString(password,'password', errors)
    if(errors.length === 0)
        errors = validateInput(username, password, true, errors)
    return errors
}

const validateSignIn = (username, password, confirm) =>{
    let errors = []
    errors = validateString(username, 'username', errors)
    errors = validateString(password,'password', errors)
    errors = validateString(confirm,'confirm password', errors)
    if(password !== confirm)
        errors.push('password doesnt match confirm password')
    if(errors.length === 0)
        errors = validateInput(username, password, false, errors)
    return errors
}

export{validateLogIn,validateSignIn}