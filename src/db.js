//conexion de la base de datos
import mongoose from "mongoose";

export const connectDB = async () => { //funcion asincrona que llama a la conexion con la base de datos
    try{
        await mongoose.connect('mongodb://localhost/practicadb')
        console.log(">>> DB is connected")
    }catch(error){
        console.log(error);
    }
};