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
import { MembershipService } from './membership.service';
import { Memberships } from 'src/models/memberships/memberships';

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

@ApiTags('Membership') 
@Controller('membership')
export class MembershipController {
  constructor(private readonly MemberService: MembershipService) {}

  /**=========================================================================
   * petición get todos
   * =========================================================================*/
  @Get('/all')
  @ApiOperation({
    summary: 'Obtener todos los Membresías',
    description:
      'Retorna una lista completa de todos los Membresías registrados en el sistema del gimnasio.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de Membresías obtenida exitosamente.',
  })
  public obtenerMemberships(): any {
    //llamamos nuestro objeto de tipo service y el metodo de
    //mostrar todos
    return this.MemberService.consultar();
  }

  /*=========================================================================
  *Consultar uno 
  =========================================================================*/
  @Get('/get/:idMemberships')
  @ApiOperation({
    summary: 'Consultar una membresía específico',
    description: 'Busca y retorna los datos de una membresía utilizando su ID.',
  })
  @ApiParam({
    name: 'idMember',
    description: 'ID numérico de la membresía',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'membresía encontrada exitosamente.',
  })
  @ApiResponse({ status: 406, description: 'Código de membresía no válido.' })
  /**le pasamos un parametro, en este caso sera el id*/
  public consultarUno(@Param() parametro: any): any {
    const codMemberships: number = Number(parametro.idMemberships);
    /**si el Memberships existe nos dara una respuesta */
    if (!isNaN(codMemberships)) {
      return this.MemberService.consultarUno(codMemberships);
      /**de lo contrario nos arrojara un error */
    } else {
      return new HttpException(
        'codigo de Memberships no existente',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  /**=========================================================================
   * agregar un Memberships
   * =========================================================================*/
  @Post('/add')
  @ApiOperation({
    summary: 'Registrar una nueva membresía',
    description: 'Crea una nuevoa membresía en la base de datos.',
  })
  @ApiBody({
    type: Memberships,
    description: 'Datos de la membresía a registrar',
  }) // Indica qué modelo recibe
  @ApiResponse({ status: 201, description: 'membresía creada correctamente.' })
  /**parametor tipo body y atributos de la clase Memberships */
  public registrarMemberships(@Body() objMemberships: Memberships): any {
    return this.MemberService.registrar(objMemberships);
  }

  /**=========================================================================
   * Actualizar el Memberships mediante parametro id
   * =========================================================================*/
  @Put('/update/:idMembership')
  @ApiOperation({
    summary: 'Actualizar una membresía',
    description:
      'Sobrescribe los datos de una membresía existente según su ID.',
  })
  @ApiParam({
    name: 'codMembership',
    description: 'ID numérico del membresía a actualizar',
    type: Number,
  })
  @ApiBody({ type: Memberships, description: 'Nuevos datos del membresía' })
  @ApiResponse({
    status: 200,
    description: 'membresía actualizado correctamente.',
  })
  @ApiResponse({ status: 406, description: 'Código de membresía no válido.' })
  public actualizarMemberships(
    @Body() objActualziar: Memberships,
    @Param() parametros: any,
  ): any {
    const codigo: number = Number(parametros.codMemberships);
    if (!isNaN(codigo)) {
      return this.MemberService.actualizar(objActualziar, codigo);
    } else {
      return new HttpException(
        'Codgio de Memberships no valido',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  /**=========================================================================
   * Eliminar Memberships por id
   * =========================================================================*/
  @Delete('/delete/:idMembership')
  @ApiOperation({
    summary: 'Eliminar un membresía físicamente',
    description:
      'Borra de forma permanente el registro del membresía en la base de datos.',
  })
  @ApiParam({
    name: 'codMember',
    description: 'ID numérico del membresía a eliminar',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'membresía eliminado correctamente.' })
  @ApiResponse({ status: 406, description: 'Código no encontrado.' })
  public delete(@Param() parametro: any): any {
    const codigo: number = Number(parametro.idMembership);
    if (!isNaN(codigo)) {
      return this.MemberService.eliminar(codigo);
    } else {
      return new HttpException(
        'Codigo no encontrado',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
  /**=========================================================================
   * soft delete para guardar el registro y desactivarlo
   * =========================================================================*/
  @Put('/sdelete/:idMembership')
  @ApiOperation({
      summary: 'Desactivar un membresía (Soft Delete)',
      description:
        'Marca al membresía como inactivo sin borrarlo físicamente de la base de datos.',
    })
    @ApiParam({
      name: 'codMember',
      description: 'ID numérico del membresía a desactivar',
      type: Number,
    })
    @ApiBody({
      type: Memberships,
      description: 'Datos necesarios para el soft delete (ej. estado)',
    })
    @ApiResponse({
      status: 200,
      description: 'membresía desactivado correctamente.',
    })
    @ApiResponse({ status: 406, description: 'Código de membresía no válido.' })
  public softdelete(
    @Body() objActualizar: Memberships,
    @Param() parametro: any,
  ): any {
    const codigo: number = Number(parametro.idMembership);
    if (!isNaN(codigo)) {
      return this.MemberService.actualizar(objActualizar, codigo);
    } else {
      return new HttpException(
        'codigo de membresia no valido',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
}
