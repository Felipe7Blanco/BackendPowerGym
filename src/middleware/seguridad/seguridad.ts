import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

@Injectable()
export class Seguridad implements NestMiddleware{
    public use(req: Request, res: Response, next: NextFunction){
        if(!req.headers.authorization){
            res.status(401).json({respuesta: "petición negada por el sistema"});


        } else{
            try {
                const token= req.headers.authorization;
                const datoSesion = verify(token, 'laClaveSecreta');

                req.body.datosUsuario= datoSesion;
                next();

            } catch (miError) {
                res.status(401).json({mensaje: "intento de fraude!"})
            }
        }
    }
}