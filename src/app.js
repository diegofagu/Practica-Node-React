//app.js se utiliza para configurar el codigo del backend
import express from 'express'; //importacion de express
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js' 

const app = express(); //se crea la constante app para inicializar express (servidor)

app.use(morgan('dev')); //es para que nos muestre un mensaje corto por consola donde aparece la peticion que se hace
app.use(express.json()); //se utiliza esto para que express pueda leer los request body


app.use('/api',authRoutes); //todas las rutas empiezan con /api ... 

export default app // cuando inicializa app lo exporta