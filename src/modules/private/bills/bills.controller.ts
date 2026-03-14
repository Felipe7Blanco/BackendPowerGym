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

/**
 * Importación de swagger
 */
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
@ApiTags('Bills')
@Controller('bills')
export class BillsController {
  constructor(private readonly billService: BillsService) {}

  /**=========================================================================
   * Petición get todos
   * =========================================================================*/
  @Get('/all')
  @ApiOperation({
    summary: 'Obtener todos los facturas',
    description:
      'Retorna una lista completa de todos los facturas registrados en el sistema del gimnasio.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de facturas obtenida exitosamente.',
  })
  public obtenerBills(): any {
    //llamamos nuestro objeto de tipo service y el metodo de
    //mostrar todos
    return this.billService.consultar();
  }

  /**=========================================================================
   * Consultar uno
   * =========================================================================*/
  @Get('/get/:idBill')
  @ApiOperation({
    summary: 'Consultar un factura específico',
    description: 'Busca y retorna los datos de un factura utilizando su ID.',
  })
  @ApiParam({
    name: 'idBill',
    description: 'ID numérico del factura',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'factura encontrado exitosamente.' })
  @ApiResponse({ status: 406, description: 'Código de factura no válido.' })
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

  /**=========================================================================
   * agregar un Bill
   * =========================================================================*/
  @Post('/add')
  @ApiOperation({
    summary: 'Registrar un nuevo bills',
    description: 'Crea un nuevo bills en la base de datos.',
  })
  @ApiBody({ type: Bills, description: 'Datos del bills a registrar' }) // Indica qué modelo recibe
  @ApiResponse({ status: 201, description: 'bills creado correctamente.' })
  /**parametor tipo body y atributos de la clase Bill */
  public registrarBill(@Body() objBill: Bills): any {
    return this.billService.registrar(objBill);
  }
}
