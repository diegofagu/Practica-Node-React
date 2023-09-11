import { Router } from "express";
import { login, register, logout , profile } from '../controllers/auth.controller.js'; // de esta manera importo los endpoints
import { authRequired } from "../middlewares/validateToken.js";

//este archivo engloba todas las rutas 

const router = Router(); // enrutador creado , se define como constante para usarlo y llamar sus metodos

router.post('/register', register); //a esta ruta se le entrega la funcion register

router.post('/login', login);// a esta ruta se le entrega la funcion login

router.post('/logout', logout);

router.get('/profile', authRequired, profile); //authRequired es una funcion que valida el token

export default router //se debe exportar el router