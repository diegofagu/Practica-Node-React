//los middleware son funciones que se ejecutan antes de que llegen a una ruta
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config';



export const authRequired = (req, res, next) => { //next es como el continue en java, se usa para que en vez de que la funcion retorne algo esta continue a otra funcion

    const {token} = req.cookies; //se guarda en token el req de las cookies para sacar el token
    if(!token) //si no existe token
        return res.status(401).json({message:"No token, authorization denied"});

        jwt.verify(token, TOKEN_SECRET, (err, user) => { //se utiliza jwt para verificar el token y se le pasa el token_Secret creado al crear un token
            if(err) return res.status(403).json({ message: "Invalid token"}); //si hay un error al momento de verificar

            req.user = user ;

            console.log(user);
        });
    
    next();

};