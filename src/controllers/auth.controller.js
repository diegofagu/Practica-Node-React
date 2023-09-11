import User from "../models/user.model.js"; //aca estoy importando el modelo creado en user importandolo con el nombre User
import bcrypt from "bcryptjs"; //importo la libreria que me permite encriptar la contraaseña
import {createAccessToken} from "../libs/jwt.js"; //importo la funcion que me permite crear tokens




export const register = async (req, res) => { //funcion de registro que va a tener un request y un response y cuando es llamada responde un texto que diga register
    //console.log(req.body); //cuando se llame al endpoint se va a devolver un request con el body 
    const {email, password , username} = req.body //aca digo que extraere del request body: un password, email y username
     
    try{
        const passwordHash = await bcrypt.hash(password, 10); //hash es un metodo que encripta la contraseña, primer parametro el string que quiero
                                        //encriptar y luego la cantidad de veces que se requiere que se ejecute el algoritmo
        const newUser = new User({ //de esta manera le digo al endpoint que cuando lo llame y le pase los parametros del modelo este va
            username, //a crear un nuevo usuario 
            email,
            password :  passwordHash  //se define el password como la constante passwordHash
        })
        console.log(newUser); //me muestra el usuario creado
        
        const userSaved = await newUser.save(); // de esta manera guarda en la bdd el usuario creado y en la constante userSaved 
        const token = await createAccessToken({id: userSaved._id}); //en este caso se define como token el id que es el parametro payload

            // res.json({token}); //aca devuelve el token al frontend
            res.cookie('token', token); //se crea una cookie la cual contendra el token
            res.json({
                message: "User created succesfully", //cuando se cree un usuario me devolvera este mensaje en json
            })

        // res.json({ //aca la respuesta se define como de tipo json y que devuelve los parametros id,username y email al frontend
        //     id: userSaved._id,
        //     username: userSaved.username,
        //     email: userSaved.email,
        //     createdAt : userSaved.createdAt,
        //     updatedAt : userSaved.updatedAt
        // });
    }catch(error){
        res.status(500).json({message: error.message}); //en el caso de error respondera con un error 500
    }
}; 


export const login = async (req, res) => { 
    const {email, password} = req.body // se necesita el email y password para el request de login
    try{

        const userFound = await  User.findOne({email}); //aca le estoy diciendo que busque por email            
        if(!userFound) return res.status(400).json({menubar: "User not found"}); //si no existe el usuario ingresado devuelve un error 400
        
        const isMatch = await bcrypt.compare(password, userFound.password);  // compara el password ingresado con el existente en la base de datos 
        if(!isMatch) return res.status(400).json({mesagge: "Incorrect password"});
 
        const token = await createAccessToken({id: userFound._id}); 

        res.cookie('token', token);
        res.json({
            message: "User logged successfully",
        })
    }catch(error){
        res.status(500).json({message: error.message});
    }
}; 

export const logout =  (req,res) => {
    res.cookie('token',"",{expires: new Date(0)})  //se crea una cookie la cual contendra el token y estara vacio, junto con una fecha de expiracion la cual sera 0
    return res.sendStatus(200);

};

export const profile = async (req, res) => {

    const userFound =  await User.findById(req.user.id);

    if(!userFound) return res.status(400).json({mesagge: "User not found"});
   
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email : userFound.email,
        cretedAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
};