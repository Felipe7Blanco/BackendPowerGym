import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BillDetails } from 'src/models/billDetails/billdetails';
import { DataSource } from 'typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BilldetailsService {
  private billdetaService: Repository<BillDetails>;

  constructor(private poolConexion: DataSource) {
    this.billdetaService = poolConexion.getRepository(BillDetails);
  }

  /**Metodo post para registar un Billdetails */
  public async registrar(objBilldetails: BillDetails): Promise<any> {
    try {
      return await this.billdetaService.save(objBilldetails);
    } catch (mierror) {
      throw new HttpException(
        'Hubo un error al realizar el registro',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**Metodo para consultar todos los BillDetails */
  public async consultar(): Promise<any> {
    try {
      return this.billdetaService.find();
    } catch (miError) {
      throw new HttpException(
        'Error al consultar los BillDetails',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /**consultar un Billdetails por el id */
  public async consultarUno(codigo: number): Promise<any> {
    try {
      return this.billdetaService.findBy({ id: codigo });
    } catch (miError) {
      throw new HttpException('Error al consultar', HttpStatus.BAD_REQUEST);
    }
  }

 
}
