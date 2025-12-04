import { sign } from "jsonwebtoken";

class GenerarTokens{

    public static procesarRespuesta(datoSesion: any): string {
        let token: string= "";
        token = sign({
            id:datoSesion.idUser,
            nombre: datoSesion.nameUser,
            rol: datoSesion.nameRol,
            telefono: datoSesion.phoneUser,
            acceso: datoSesion.nameAcces
        }, "laClaveSecreta", {expiresIn: "1h"});
        return token;
    }
}
export default GenerarTokens;
console.log()