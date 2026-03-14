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
import { UsermembershipsService } from './usermemberships.service';
import { Usermemberships } from 'src/models/usermemberships/usermemberships';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('UserMemberships')
@Controller('usermemberships')
export class UsermembershipsController {
  constructor(private readonly UMemService: UsermembershipsService) {}

  /**===================================================================
   * Petición get todos
  ===================================================================*/
  @Get('/all')
  @ApiOperation({
    summary: 'Obtener todas las membresias',
    description:
      'Retorna una lista completa de membresías registradas en el sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista usuarios obtenida extisamente',
  })
  public obtenerUsermemberships(): any {
    //llamamos nuestro objeto de tipo service y el metodo de
    //mostrar todos
    return this.UMemService.consultar();
  }

  /**===================================================================
   * Consultar uno
   * ===================================================================*/
  @Get('/get/:idUserM')
  @ApiOperation({
    summary: 'Consultar una membresía en específico',
    description:
      'Busca en los registros del sistema una membresía utilizando su ID',
  })
  @ApiParam({
    name: 'idUserMembership',
    description: 'id númerico de la membresía',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'membresía de usuario encontrado exitosamente.',
  })
  @ApiResponse({ status: 406, description: 'Código de membresía no válido.' })
  /**le pasamos un parametro, en este caso sera el id*/
  public consultarUno(@Param() parametro: any): any {
    const codUser: number = Number(parametro.idUserM);
    /**si el User existe nos dara una respuesta */
    if (!isNaN(codUser)) {
      return this.UMemService.consultarUno(codUser);
      /**de lo contrario nos arrojara un error */
    } else {
      return new HttpException(
        'codigo de User no existente',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  /**===================================================================
   * agregar un User
   * ===================================================================*/
  @Post('/add')
  @ApiOperation({
    summary: 'Registrar un nuevo usuario',
    description: 'Crea un nuevo usuario en la base de datos.',
  })
  @ApiBody({
    type: Usermemberships,
    description: 'Datos del usuario a registrar',
  }) // Indica qué modelo recibe
  @ApiResponse({
    status: 201,
    description: 'Membresía asignada correctamente.',
  })
  /**parametor tipo body y atributos de la clase User */
  public registrarUser(@Body() objUser: Usermemberships): any {
    return this.UMemService.registrar(objUser);
  }

  /**===================================================================
   * Actualizar el User mediante parametro id
   * ===================================================================*/
  @Put('/update/:codUser')
  @ApiOperation({
    summary: 'Actualizar un usuario',
    description:
      'Sobrescribe los datos de una membresía de usuario existente según su ID.',
  })
  @ApiParam({
    name: 'codUser',
    description: 'ID numérico del usuario a actualizar',
    type: Number,
  })
  @ApiBody({ type: Usermemberships, description: 'Nuevos datos del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente.',
  })
  @ApiResponse({ status: 406, description: 'Código de usuario no válido.' })
  public actualizarUser(
    @Body() objActualziar: Usermemberships,
    @Param() parametros: any,
  ): any {
    const codigo: number = Number(parametros.codUser);
    if (!isNaN(codigo)) {
      return this.UMemService.actualizar(objActualziar, codigo);
    } else {
      return new HttpException(
        'Codgio de User no valido',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  /**===================================================================
   * Eliminar User por id
   * ===================================================================*/
  @Delete('/delete/:codUser')
  @ApiOperation({
    summary: 'Eliminar una membresía de usuario físicamente',
    description:
      'Borra de forma permanente el registro de la membresía usuario en la base de datos.',
  })
  @ApiParam({
    name: 'codUser',
    description: 'ID numérico de la membresía usuario a eliminar',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'membresía de usuario eliminado correctamente.',
  })
  @ApiResponse({ status: 406, description: 'Código no encontrado.' })
  public delete(@Param() parametro: any): any {
    const codigo: number = Number(parametro.codUser);
    if (!isNaN(codigo)) {
      return this.UMemService.eliminar(codigo);
    } else {
      return new HttpException(
        'Codigo no encontrado',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
  /**===================================================================
   *  soft delete para guardar el registro y desactivarlo
   * =================================================================== */
  @Put('/sdelete/:codUser')
  @ApiOperation({
    summary: 'Desactivar una membresía de usuario (Soft Delete)',
    description:
      'Marca la membresía de usuario como inactivo sin borrarlo físicamente de la base de datos.',
  })
  @ApiParam({
    name: 'codUser',
    description: 'ID numérico de la membresía usuario a desactivar',
    type: Number,
  })
  @ApiBody({
    type: Usermemberships,
    description: 'Datos necesarios para el soft delete (ej. estado)',
  })
  @ApiResponse({
    status: 200,
    description: 'membresía de Usuario desactivado correctamente.',
  })
  @ApiResponse({ status: 406, description: 'Código de membresía de usuario no válido.' })
  public softdelete(
    @Body() objActualizar: Usermemberships,
    @Param() parametro: any,
  ): any {
    const codigo: number = Number(parametro.codUser);
    if (!isNaN(codigo)) {
      return this.UMemService.actualizar(objActualizar, codigo);
    } else {
      return new HttpException(
        'codigo de usuario no valido',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
}
