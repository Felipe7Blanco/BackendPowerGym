import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MedicalRecords } from 'src/models/medical-records/medical-records';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MedicalreportsService {
  private medicalService: Repository<MedicalRecords>;

  constructor(private poolConexion: DataSource) {
    this.medicalService = poolConexion.getRepository(MedicalRecords);
  }

  /**Metodo post para registar un Medical */
  public async registrar(objMedical: MedicalRecords): Promise<any> {
    try {
      return await this.medicalService.save(objMedical);
    } catch (mierror) {
      throw new HttpException(
        'Hubo un error al realizar el registro',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**Metodo para consultar todos los MedicalRecords */
  public async consultar(): Promise<any> {
    try {
      return this.medicalService.find();
    } catch (miError) {
      throw new HttpException(
        'Error al consultar los MedicalRecords',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /**consultar un Medical por el id */
  public async consultarUno(codigo: number): Promise<any> {
    try {
      return this.medicalService.findBy({ idMedical: codigo });
    } catch (miError) {
      throw new HttpException('Error al consultar', HttpStatus.BAD_REQUEST);
    }
  }


  /**Actualizar el Medical */
  public async actualizar(
    objMedical: MedicalRecords,
    codigo: number,
  ): Promise<any> {
    try {
      const objActualizado = this.medicalService.update(
        { idMedical: codigo },
        objMedical,
      );
      return new HttpException(
        { mensaje: 'Medical actualizado', objeto: objActualizado },
        HttpStatus.OK,
      );
    } catch (miError) {
      throw new HttpException('Erro al actualizar', HttpStatus.BAD_REQUEST);
    }
  }

  /**Metodo eliminar */
  public async eliminar(codigo: number): Promise<any> {
    try {
      return this.medicalService.delete({ idMedical: codigo });
    } catch (miErro) {
      throw new HttpException(
        'Error al elminar el Medical',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
