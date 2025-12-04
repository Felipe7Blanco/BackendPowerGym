import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BillsService } from './bills.service';
import { Bills } from 'src/models/bills/bills';

@Controller('bills')
export class BillsController {
  constructor(private readonly billService: BillsService) {}

  //Petición get todos
  @Get('/all')
  public obtenerBills(): any {
    //llamamos nuestro objeto de tipo service y el metodo de
    //mostrar todos
    return this.billService.consultar();
  }

  /**Consultar uno */
  @Get('/get/:idBill')
  /**le pasamos un parametro, en este caso sera el id*/
  public consultarUno(@Param() parametro: any): any {
    const codBill: number = Number(parametro.idBill);
    /**si el Bill existe nos dara una respuesta */
    if (!isNaN(codBill)) {
      return this.billService.consultarUno(codBill);
      /**de lo contrario nos arrojara un error */
    } else {
      return new HttpException(
        'codigo de Bill no existente',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  /**agregar un Bill */
  @Post('/add')
  /**parametor tipo body y atributos de la clase Bill */
  public registrarBill(@Body() objBill: Bills): any {
    return this.billService.registrar(objBill);
  }
}
