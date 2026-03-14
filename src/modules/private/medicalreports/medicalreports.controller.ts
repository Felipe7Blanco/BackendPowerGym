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
import { MedicalreportsService } from './medicalreports.service';
import { MedicalRecords } from 'src/models/medical-records/medical-records';

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

@ApiTags('MedicalReports') // Agrupa todos estos endpoints en la sección "Medical reports" en Swagger
@Controller('medicalreports')
export class MedicalreportsController {
  constructor(private readonly medicalService: MedicalreportsService) {}

  /**=========================================================================
   * Petición get todos
   * =========================================================================*/
  @Get('/all')
  @ApiOperation({
    summary: 'Obtener todos los reportes medicos',
    description:
      'Retorna una lista completa de todos los reportes medicos registrados en el sistema del gimnasio.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de reportes medicos obtenida exitosamente.',
  })
  public obtenerMedicals(): any {
    //llamamos nuestro objeto de tipo service y el metodo de
    //mostrar todos
    return this.medicalService.consultar();
  }

  /**=========================================================================
   * Consultar uno
   * =========================================================================*/
  @Get('/get/:idMedical')
  @ApiOperation({
    summary: 'Consultar un reporte medico específico',
    description:
      'Busca y retorna los datos de un reporte medico utilizando su ID.',
  })
  @ApiParam({
    name: 'idMedicalReport',
    description: 'ID numérico del reporte medico',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'reporte medico encontrado exitosamente.',
  })
  @ApiResponse({
    status: 406,
    description: 'Código de reporte medico no válido.',
  })
  /**le pasamos un parametro, en este caso sera el id*/
  public consultarUno(@Param() parametro: any): any {
    const codMedical: number = Number(parametro.idMedical);
    /**si el Medical existe nos dara una respuesta */
    if (!isNaN(codMedical)) {
      return this.medicalService.consultarUno(codMedical);
      /**de lo contrario nos arrojara un error */
    } else {
      return new HttpException(
        'codigo de Medical no existente',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  /**=========================================================================
   * agregar un Medical
   * =========================================================================*/
  @Post('/add')
  @ApiOperation({
    summary: 'Registrar un nuevo meedicalrecord',
    description: 'Crea un nuevo meedicalrecord en la base de datos.',
  })
  @ApiBody({
    type: MedicalRecords,
    description: 'Datos del meedicalrecord a registrar',
  }) // Indica qué modelo recibe
  @ApiResponse({
    status: 201,
    description: 'meedicalrecord creado correctamente.',
  })
  /**parametor tipo body y atributos de la clase Medical */
  public registrarMedical(@Body() objMedical: MedicalRecords): any {
    return this.medicalService.registrar(objMedical);
  }

  /**=========================================================================
   * Actualizar el Medical mediante parametro id
   * =========================================================================*/
  @Put('/update/:idMedical')
  @ApiOperation({
    summary: 'Actualizar un medicalrecord',
    description:
      'Sobrescribe los datos de un medicalrecord existente según su ID.',
  })
  @ApiParam({
    name: 'codMedicalRecord',
    description: 'ID numérico del medicalrecord a actualizar',
    type: Number,
  })
  @ApiBody({
    type: MedicalRecords,
    description: 'Nuevos datos del medicalrecord',
  })
  @ApiResponse({
    status: 200,
    description: 'medicalrecord actualizado correctamente.',
  })
  @ApiResponse({
    status: 406,
    description: 'Código de medicalrecord no válido.',
  })
  public actualizarMedical(
    @Body() objActualziar: MedicalRecords,
    @Param() parametros: any,
  ): any {
    const codigo: number = Number(parametros.idMedical);
    if (!isNaN(codigo)) {
      return this.medicalService.actualizar(objActualziar, codigo);
    } else {
      return new HttpException(
        'Codgio de Medical no valido',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  /**=========================================================================
   * Eliminar Medical por id
   * =========================================================================*/
  @Delete('/delete/:idMedical')
  @ApiOperation({
    summary: 'Eliminar un medicalrecord físicamente',
    description:
      'Borra de forma permanente el registro del medicalrecord en la base de datos.',
  })
  @ApiParam({
    name: 'codMedicalRecord',
    description: 'ID numérico del medicalrecord a eliminar',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'medicalrecord eliminado correctamente.' })
  @ApiResponse({ status: 406, description: 'Código no encontrado.' })
  public delete(@Param() parametro: any): any {
    const codigo: number = Number(parametro.idMedical);
    if (!isNaN(codigo)) {
      return this.medicalService.eliminar(codigo);
    } else {
      return new HttpException(
        'Codigo no encontrado',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  /** soft delete para guardar el registro y desactivarlo */
  /**  @Put("/sdelete/:codMedical")
            public softdelete(@Body() objActualizar:MedicalRecords ,@Param() parametro:any):any{
                const codigo : number = Number(parametro.codMedical);
                if(!isNaN(codigo)){
                    return this.medicalService.actualizar(objActualizar, codigo);
                } else{
                    return new HttpException("codigo de medicalrecord no valido", HttpStatus.NOT_ACCEPTABLE);
                }
            }
            */
}
