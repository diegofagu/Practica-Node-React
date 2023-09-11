import { Router } from "express";
import { login, register, logout } from "../controllers/auth.controller.js"; // de esta manera importo los endpoints

//este archivo engloba todas las rutas 

const router = Router(); // enrutador creado , se define como constante para usarlo y llamar sus metodos

router.post('/register', register); //a esta ruta se le entrega la funcion register

router.post('/login', login);// a esta ruta se le entrega la funcion login

router.post('/logout', logout);

export default router //se debe exportar el router