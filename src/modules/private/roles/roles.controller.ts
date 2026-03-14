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
import { RolesService } from './roles.service';
import { Roles } from 'src/models/roles/roles';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolService: RolesService) {}

  /**=========================================================================
   * Petición get todos
   * =========================================================================*/
  @Get('/all')
  @ApiOperation({
    summary: 'Obtener todos los roles',
    description:
      'Retorna una lista completa de todos los roles registrados en el sistema del gimnasio.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de roles obtenida exitosamente.',
  })
  public obtenerRoles(): any {
    //llamamos nuestro objeto de tipo service y el metodo de
    //mostrar todos
    return this.rolService.consultar();
  }

  /*=========================================================================
  *Consultar uno 
  =========================================================================*/
  @Get('/get/:idRol')
  @ApiOperation({
    summary: 'Consultar un rol específico',
    description: 'Busca y retorna los datos de un rol utilizando su ID.',
  })
  @ApiParam({
    name: 'idROl',
    description: 'ID numérico del rol',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'rol encontrado exitosamente.' })
  @ApiResponse({ status: 406, description: 'Código de rol no válido.' })
  /**le pasamos un parametro, en este caso sera el uid*/
  public consultarUno(@Param() parametro: any): any {
    const codRol: number = Number(parametro.idRol);
    /**si el rol existe nos dara una respuesta */
    if (!isNaN(codRol)) {
      return this.rolService.consultarUno(codRol);
      /**de lo contrario nos arrojara un error */
    } else {
      return new HttpException(
        'codigo de rol no existente',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  /**=========================================================================
   * agregar un rol
   * =========================================================================*/
  @Post('/add')
  @ApiOperation({
    summary: 'Registrar un nuevo rol',
    description: 'Crea un nuevo rol en la base de datos.',
  })
  @ApiBody({ type: Roles, description: 'Datos del rol a registrar' }) // Indica qué modelo recibe
  @ApiResponse({ status: 201, description: 'rol creado correctamente.' })
  /**parametor tipo body y atributos de la clase rol */
  public registrarRol(@Body() objROl: Roles): any {
    return this.rolService.registrar(objROl);
  }

  /*=========================================================================
  *Actualizar el rol mediante parametro id 
  =========================================================================*/
  @Put('/update/:idRol')
  @ApiOperation({
    summary: 'Actualizar un rol',
    description: 'Sobrescribe los datos de un rol existente según su ID.',
  })
  @ApiParam({
    name: 'codRol',
    description: 'ID numérico del rol a actualizar',
    type: Number,
  })
  @ApiBody({ type: Roles, description: 'Nuevos datos del rol' })
  @ApiResponse({
    status: 200,
    description: 'rol actualizado correctamente.',
  })
  @ApiResponse({ status: 406, description: 'Código de rol no válido.' })
  public actualizarRol(
    @Body() objActualziar: Roles,
    @Param() parametros: any,
  ): any {
    const codigo: number = Number(parametros.idRol);
    if (!isNaN(codigo)) {
      return this.rolService.actualizar(objActualziar, codigo);
    } else {
      return new HttpException(
        'Codgio de rol no valido',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  /*=========================================================================
  Eliminar rol por id 
  =========================================================================*/
  @Delete('/delete/:codROl')
  @ApiOperation({
    summary: 'Eliminar un rol físicamente',
    description:
      'Borra de forma permanente el registro del rol en la base de datos.',
  })
  @ApiParam({
    name: 'codRol',
    description: 'ID numérico del rol a eliminar',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'rol eliminado correctamente.' })
  @ApiResponse({ status: 406, description: 'Código no encontrado.' })
  public delete(@Param() parametro: any): any {
    const codigo: number = Number(parametro.codROl);
    if (!isNaN(codigo)) {
      return this.rolService.eliminar(codigo);
    } else {
      return new HttpException(
        'Codigo no encontrado',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
}
