import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from 'src/models/users/users';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private userRepository: Repository<Users>;

  constructor(private poolConexion: DataSource) {
    this.userRepository = poolConexion.getRepository(Users);
  }

  /**Metodo que evita la duplacidad de Users */
  public async verificaruser(identificacion: string): Promise<boolean> {
    try {
      const existe = await this.userRepository.findBy({
        identificationUser: identificacion,
      });

      return existe.length > 0;
    } catch (miError) {
      throw new HttpException(
        'no hay envio de información',
        HttpStatus.CONFLICT,
      );
    }
  }

  /**Metodo post para registar un user */
  public async registrar(objuser: Users): Promise<any> {
    try {
      if (await this.verificaruser(objuser.identificationUser)) {
        return new HttpException(
          'El numero de identificación ya existe en la base de datos',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return await this.userRepository.save(objuser);
      }
    } catch (mierror) {
      throw new HttpException(
        'Hubo un error al realizar el registro',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**Metodo para consultar todos los Users */
  public async consultar(): Promise<any> {
    try {
      return this.userRepository.find();
    } catch (miError) {
      throw new HttpException(
        'Error al consultar los Users',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /**consultar un user por el id */
  public async consultarUno(codigo: number): Promise<any> {
    try {
      return this.userRepository.findBy({ idUser: codigo });
    } catch (miError) {
      throw new HttpException('Error al consultar', HttpStatus.BAD_REQUEST);
    }
  }

  /**consultar un user por el nombre */
  public async consultarXname(objuser: Users) {
    try {
      if (await this.verificaruser(objuser.nameUser)) {
        return this.userRepository.findBy({ nameUser: objuser.nameUser });
      } else {
        throw new HttpException(
          'No existe este registro',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (mierror) {
      throw new HttpException('Error al consultar', HttpStatus.BAD_REQUEST);
    }
  }

  /**Actualizar el user */
  public async actualizar(objuser: Users, codigo: number): Promise<any> {
    try {
      if (await this.verificaruser(objuser.identificationUser)) {
        return new HttpException('El user ya existe', HttpStatus.BAD_REQUEST);
      } else {
        const objActualizado = this.userRepository.update(
          { idUser: codigo },
          objuser,
        );
        return new HttpException(
          { mensaje: 'user actualizado', objeto: objActualizado },
          HttpStatus.OK,
        );
      }
    } catch (miError) {
      throw new HttpException('Erro al actualizar', HttpStatus.BAD_REQUEST);
    }
  }

  /** SoftDelete */
  public async softdelete(objuser: Users, codigo: number): Promise<any> {
    try {
      const objActualizado = this.userRepository.update(
        { idUser: codigo },
        objuser,
      );
      return new HttpException(
        { mensaje: 'user actualizado', objeto: objActualizado },
        HttpStatus.OK,
      );
    } catch (miError) {
      throw new HttpException('Erro al eliminar', HttpStatus.BAD_REQUEST);
    }
  }

  /**Metodo eliminar */
  public async eliminar(codigo: number): Promise<any> {
    try {
      return this.userRepository.delete({ idUser: codigo });
    } catch (miErro) {
      throw new HttpException(
        'Error al elminar el user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
