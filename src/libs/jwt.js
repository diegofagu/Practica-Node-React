import {TOKEN_SECRET} from '../config.js'
import jwt from 'jsonwebtoken'


//funcion se crea el token
export function createAccessToken(payload){     
    return new Promise((resolve, reject) => { //este tipo de funcion devuelven un resolve y un reject
        jwt.sign({ 
            payload,//primer parametro es el dato que estoy guardando dentro, en este caso se define como payload
        }, TOKEN_SECRET,{ //el segundo es el key en este caso esta definido en config.js 
            expiresIn: "1d", //luego el tiempo que durara el token
        },
        (err, token) => {
            if (err) reject(err); //reject es cuando las cosas salen mal
            resolve(token); //resolve es cuando funciona
        }
        ); 
    })
 }