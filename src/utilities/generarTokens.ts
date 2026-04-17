import { sign } from 'jsonwebtoken';

class GenerarTokens {
  public static procesarRespuesta(datoSesion: any): string {
    console.log('GenerarTokens - datoSesion:', datoSesion);
    console.log(
      'GenerarTokens - datoSesion keys:',
      Object.keys(datoSesion || {}),
    );

    // Usar la clave secreta del entorno, o una por defecto para desarrollo
    const secretKey = process.env.JWT_SECRET || 'default_secret';

    // Generar token con los datos de sesión
    // Nota: Los nombres de los campos deben coincidir con los que devuelve la consulta SQL
    const payload = {
      idUser: datoSesion.id_user, // La consulta devuelve id_user, no idUser
      nombre: datoSesion.name_user, // La consulta devuelve name_user, no nameUser
      rol: datoSesion.name_rol, // La consulta devuelve name_rol, no nameRol
      acceso: datoSesion.name_acces, // La consulta devuelve name_acces, no nameAcces
    };

    console.log('GenerarTokens - payload:', payload);

    const token = sign(payload, secretKey, { expiresIn: '1h' });

    console.log('GenerarTokens - token generado:', token);
    console.log(
      'GenerarTokens - token decodificado:',
      JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()),
    );

    return token;
  }
}
export default GenerarTokens;
