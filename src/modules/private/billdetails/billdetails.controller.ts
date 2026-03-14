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

import { BillDetails } from 'src/models/billDetails/billdetails';
import { BilldetailsService } from './billdetails.service';

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

@ApiTags('Bills Details')
@Controller('billdetails')
export class BilldetailsController {
  constructor(private readonly billdservice: BilldetailsService) {}

  /**=========================================================================
   * Petición get todos
   * =========================================================================*/
  @Get('/all')
  @ApiOperation({
    summary: 'Obtener todos los billsDetails',
    description:
      'Retorna una lista completa de todos los billsDetails registrados en el sistema del gimnasio.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de billsDetails obtenida exitosamente.',
  })
  public obtenerBillDetails(): any {
    //llamamos nuestro objeto de tipo service y el metodo de
    //mostrar todos
    return this.billdservice.consultar();
  }

  /*=========================================================================
  Consultar uno 
  =========================================================================*/
  @Get('/get/:idBillDetails')
  @ApiOperation({
    summary: 'Consultar un billsDetails específico',
    description:
      'Busca y retorna los datos de un billsDetails utilizando su ID.',
  })
  @ApiParam({
    name: 'idUser',
    description: 'ID numérico del billsDetails',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'billsDetails encontrado exitosamente.',
  })
  @ApiResponse({
    status: 406,
    description: 'Código de billsDetails no válido.',
  })
  /**le pasamos un parametro, en este caso sera el id*/
  public consultarUno(@Param() parametro: any): any {
    const codBillDetails: number = Number(parametro.idBillDetails);
    /**si el BillDetails existe nos dara una respuesta */
    if (!isNaN(codBillDetails)) {
      return this.billdservice.consultarUno(codBillDetails);
      /**de lo contrario nos arrojara un error */
    } else {
      return new HttpException(
        'codigo de BillDetails no existente',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  /*=========================================================================
  agregar un BillDetails 
  =========================================================================*/
  @Post('/add')
  @ApiOperation({
    summary: 'Registrar un nuevo billDetails',
    description: 'Crea un nuevo billDetails en la base de datos.',
  })
  @ApiBody({
    type: BillDetails,
    description: 'Datos del billDetails a registrar',
  }) // Indica qué modelo recibe
  @ApiResponse({
    status: 201,
    description: 'billDetails creado correctamente.',
  })
  /**parametor tipo body y atributos de la clase BillDetails */
  public registrarBillDetails(@Body() objBillDetails: BillDetails): any {
    return this.billdservice.registrar(objBillDetails);
  }
}
