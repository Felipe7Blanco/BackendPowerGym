import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { acces } from 'src/models/acces/acces';
import { DataSource, Repository } from 'typeorm';
import { ACCESO_SQL } from '../register/register_sql';
import GenerarTokens from 'src/utilities/generarTokens';

@Injectable()
export class AccesService {
  private accesRepository: Repository<acces>;

  constructor(private poolConexion: DataSource) {
    this.accesRepository = poolConexion.getRepository(acces);
  }

  // Método para iniciar sesión
  public async sesion(objAcceso: acces): Promise<any> {
    console.log('=== INICIO DE SESIÓN ===');
    console.log('Email recibido:', objAcceso.nameAcces);
    console.log('Password recibido (texto plano):', objAcceso.passwordAccess);

    try {
      const usuarioExiste = await this.accesRepository.findBy({
        nameAcces: objAcceso.nameAcces,
      });

      console.log('Usuario encontrado:', usuarioExiste.length > 0);

      if (usuarioExiste.length === 0) {
        throw new HttpException(
          'Usuario no registrado',
          HttpStatus.BAD_REQUEST,
        );
      }

      const claveAcceso = usuarioExiste[0].passwordAccess;
      console.log('Hash almacenado en BD:', claveAcceso);
      
      // CAMBIO 1: Comparar la contraseña en texto plano con el hash bcrypt
      const passwordMatch = compareSync(objAcceso.passwordAccess, claveAcceso);
      console.log('¿Contraseña coincide?:', passwordMatch);

      if (!passwordMatch) {
        throw new HttpException(
          'Las contraseñas no coinciden',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      // CAMBIO 2: Si la contraseña coincide, generar token
      const datoSesion = await this.accesRepository.query(
        ACCESO_SQL.DATOS_SESION,
        [usuarioExiste[0].idUser],
      );

      console.log('Datos de sesión:', datoSesion);

      if (!datoSesion || datoSesion.length === 0) {
        throw new HttpException(
          'No se encontraron datos de sesión',
          HttpStatus.NOT_FOUND,
        );
      }

      const tokenSistema = GenerarTokens.procesarRespuesta(datoSesion[0]);

      if (!tokenSistema || tokenSistema === '') {
        throw new HttpException(
          'Fallo al generar la autenticación',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      console.log('Token generado exitosamente');
      
      // CAMBIO 3: Retornar objeto con tokenApp directamente
      return { tokenApp: tokenSistema };

    } catch (error) {
      console.error('=== ERROR EN INICIO DE SESIÓN ===');
      console.error(error);

      // CAMBIO 4: Si ya es un HttpException, lanzarlo tal cual
      if (error instanceof HttpException) {
        throw error;
      }

      // Si es otro tipo de error, lanzar un error genérico
      throw new HttpException(
        'Error al procesar la solicitud',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}