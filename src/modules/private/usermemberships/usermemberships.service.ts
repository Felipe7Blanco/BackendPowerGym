import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Usermemberships } from 'src/models/usermemberships/usermemberships';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsermembershipsService {
  private userMemService: Repository<Usermemberships>;

  constructor(private poolConexion: DataSource) {
    this.userMemService = poolConexion.getRepository(Usermemberships);
  }

  /**Metodo post para registar un user */
  public async registrar(objuser: Usermemberships): Promise<any> {
    try {
      return await this.userMemService.save(objuser);
    } catch (mierror) {
      throw new HttpException(
        'Hubo un error al realizar el registro',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**Metodo para consultar todos los Usermemberships */
  public async consultar(): Promise<any> {
    try {
      return this.userMemService.find();
    } catch (miError) {
      throw new HttpException(
        'Error al consultar los Usermemberships',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /**consultar un user por el id */
  public async consultarUno(codigo: number): Promise<any> {
    try {
      return this.userMemService.findBy({ idUserM: codigo });
    } catch (miError) {
      throw new HttpException('Error al consultar', HttpStatus.BAD_REQUEST);
    }
  }

  /**Actualizar el user */
  public async actualizar(
    objuser: Usermemberships,
    codigo: number,
  ): Promise<any> {
    try {
      const objActualizado = this.userMemService.update(
        { idUserM: codigo },
        objuser,
      );
      return new HttpException(
        { mensaje: 'membresia de usuario actualizado actualizado', objeto: objActualizado },
        HttpStatus.OK,
      );
    } catch (miError) {
      throw new HttpException('Erro al actualizar', HttpStatus.BAD_REQUEST);
    }
  }

  /**Metodo eliminar */
  public async eliminar(codigo: number): Promise<any> {
    try {
      return this.userMemService.delete({ idUserM: codigo });
    } catch (miErro) {
      throw new HttpException(
        'Error al elminar el membresia de usuario',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
