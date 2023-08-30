import User from "../models/user.model.js"; //aca estoy importando el modelo creado en user importandolo con el nombre User

export const register = async (req, res) => { //funcion de registro que va a tener un request y un response y cuando es llamada responde un texto que diga register
    //console.log(req.body); //cuando se llame al endpoint se va a devolver un request con el body 
    const {email, password , username} = req.body //aca digo que extraere del request body un password, email y username
     
    try{
        const newUser = new User({ //de esta manera le digo al endpoint que cuando lo llame y le pase los parametros del modelo este va
            username, //a crear un nuevo usuario 
            email,
            password
        })
        console.log(newUser); //me muestra el usuario creado
        const userSaved = await newUser.save(); // de esta manera guarda en la bdd el usuario creado y en la constante userSaved 
        res.json(userSaved);
    }catch(error){
        console.log(error);
    }
}; 

export const login = (req, res) => res.send('login');
