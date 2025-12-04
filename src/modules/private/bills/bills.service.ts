import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Bills } from 'src/models/bills/bills';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BillsService {
  private billRepository: Repository<Bills>;

  constructor(private poolConexion: DataSource) {
    this.billRepository = poolConexion.getRepository(Bills);
  }

  /**Metodo post para registar un Bills */
  public async registrar(objBills: Bills): Promise<any> {
    try {
      return await this.billRepository.save(objBills);
    } catch (mierror) {
      throw new HttpException(
        'Hubo un error al realizar el registro',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**Metodo para consultar todos los Bills */
  public async consultar(): Promise<any> {
    try {
      return this.billRepository.find();
    } catch (miError) {
      throw new HttpException(
        'Error al consultar los Bills',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /**consultar un Bills por el id */
  public async consultarUno(codigo: number): Promise<any> {
    try {
      return this.billRepository.findBy({ idBill: codigo });
    } catch (miError) {
      throw new HttpException('Error al consultar', HttpStatus.BAD_REQUEST);
    }
  }


}
