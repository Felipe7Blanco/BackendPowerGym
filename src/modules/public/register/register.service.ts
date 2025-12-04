import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { acces } from 'src/models/acces/acces';
import { Users } from 'src/models/users/users';
import { DataSource, Repository } from 'typeorm';
import { ACCESO_SQL } from './register_sql';
import GenerarTokens from 'src/utilities/generarTokens';

@Injectable()
export class RegisterService {
  private userReporitory: Repository<Users>;
  private accesRepository: Repository<acces>;

  constructor(private poolConexion: DataSource) {
    this.userReporitory = poolConexion.getRepository(Users);
    this.accesRepository = poolConexion.getRepository(acces);
  }

  public async newUser(objAcceso: acces, objUser: Users): Promise<any> {
    try {
      const userExist = await this.accesRepository.findBy({
        nameAcces: objAcceso.nameAcces,
      });
      if (userExist.length == 0) {
        let codUser = (await this.userReporitory.save(objUser)).idUser;

        const claveCifrada = hashSync(objAcceso.passwordAccess);
        objAcceso.idUser = codUser;
        objAcceso.passwordAccess = claveCifrada;
        await this.accesRepository.save(objAcceso);

        console.log(
          'usuario y acceso guardados. Buscando datos de sesión para codUser',
          codUser,
        );

        let datosSesion = await this.accesRepository.query(
          ACCESO_SQL.DATOS_SESION,
          [codUser],
        );

        console.log('Resultado DATOS_SESION:', datosSesion);

        if (datosSesion.length === 0) {
          throw new Error(
            `No se encontraron datos de sesión para usuario ID ${codUser}. ¿Está el rol/id_rol bien seteado?`,
          );
        }

        const token = GenerarTokens.procesarRespuesta(datosSesion[0]);

        if (token !== '') {
         // throw new HttpException({ tokenApp: token }, HttpStatus.OK);
        return {correo: objAcceso.nameAcces ,tokenApp: token };
        }else {
          return new HttpException(
            'Fallo al generar el token',
            HttpStatus.METHOD_NOT_ALLOWED,
          );
        }
      } else {
        return new HttpException(
          'el usuario ya existe',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    } catch (miError) {
      console.error('error en new user', miError)
      throw new HttpException(
        '!fallo al registrar el usuario',
        HttpStatus.CONFLICT,
      );
    }
  }
}
