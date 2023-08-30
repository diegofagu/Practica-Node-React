import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js"; // de esta manera importo los endpoints

//este archivo engloba todas las rutas relacionadas con el login

const router = Router(); // enrutador creado

router.post('/register', register); //a esta ruta se le entrega la funcion register

router.post('/login', login);// a esta ruta se le entrega la funcion login


export default router //se debe exportar el router