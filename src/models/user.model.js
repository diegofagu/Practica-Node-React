import mongoose from "mongoose";

mongoose.Schema({ //el esquema es el objeto que vamos a crear 
    username:{
        type: String, //el tipo de dato
        required: true, //el tipo de dato es requerido siempre
        trim: true, //para que el esquema limpie el dato si es que le agregan espacios en el input
    },
    email:{
        type: String,
        required: true,
        unique: true, //el dato es unico (seria como el id)
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
})

export default mongoose.model('User', userSchema) //cuando lo llamamos crea una coleccion de usuarios User 
                                                //llama al schema para que guarde los datos de la manera que se especifica en el objeto
                                                //de esta manera con User interactuamos con el modelo de la base de datos