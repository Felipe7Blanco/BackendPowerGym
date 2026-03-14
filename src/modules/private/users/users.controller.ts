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
import { UsersService } from './users.service';
import { Users } from 'src/models/users/users';

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

/**Inicio logica */
@ApiTags('Users') // Agrupa todos estos endpoints en la sección "Users" en Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // =========================================================================
  // OBTENER TODOS LOS USUARIOS
  // =========================================================================
  @Get('/all')
  @ApiOperation({
    summary: 'Obtener todos los usuarios',
    description:
      'Retorna una lista completa de todos los usuarios registrados en el sistema del gimnasio.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida exitosamente.',
  })
  public obtenerUsers(): any {
    return this.userService.consultar();
  }

  // =========================================================================
  // OBTENER UN USUARIO POR ID
  // =========================================================================
  @Get('/get/:idUser')
  @ApiOperation({
    summary: 'Consultar un usuario específico',
    description: 'Busca y retorna los datos de un usuario utilizando su ID.',
  })
  @ApiParam({
    name: 'idUser',
    description: 'ID numérico del usuario',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'Usuario encontrado exitosamente.' })
  @ApiResponse({ status: 406, description: 'Código de usuario no válido.' })
  public consultarUno(@Param() parametro: any): any {
    const codUser: number = Number(parametro.idUser);

    if (!isNaN(codUser)) {
      return this.userService.consultarUno(codUser);
    } else {
      // Nota: Es mejor usar 'throw' para que NestJS intercepte el error correctamente
      throw new HttpException(
        'Código de usuario no existente',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  // =========================================================================
  // CREAR UN NUEVO USUARIO
  // =========================================================================
  @Post('/add')
  @ApiOperation({
    summary: 'Registrar un nuevo usuario',
    description: 'Crea un nuevo usuario en la base de datos.',
  })
  @ApiBody({ type: Users, description: 'Datos del usuario a registrar' }) // Indica qué modelo recibe
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente.' })
  public registrarUser(@Body() objUser: Users): any {
    return this.userService.registrar(objUser);
  }

  // =========================================================================
  // ACTUALIZAR UN USUARIO (TOTAL)
  // =========================================================================
  @Put('/update/:codUser')
  @ApiOperation({
    summary: 'Actualizar un usuario',
    description: 'Sobrescribe los datos de un usuario existente según su ID.',
  })
  @ApiParam({
    name: 'codUser',
    description: 'ID numérico del usuario a actualizar',
    type: Number,
  })
  @ApiBody({ type: Users, description: 'Nuevos datos del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente.',
  })
  @ApiResponse({ status: 406, description: 'Código de usuario no válido.' })
  public actualizarUser(
    @Body() objActualziar: Users,
    @Param() parametros: any,
  ): any {
    const codigo: number = Number(parametros.codUser);

    if (!isNaN(codigo)) {
      return this.userService.actualizar(objActualziar, codigo);
    } else {
      throw new HttpException(
        'Código de usuario no válido',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  // =========================================================================
  // ELIMINAR UN USUARIO (HARD DELETE)
  // =========================================================================
  @Delete('/delete/:codUser')
  @ApiOperation({
    summary: 'Eliminar un usuario físicamente',
    description:
      'Borra de forma permanente el registro del usuario en la base de datos.',
  })
  @ApiParam({
    name: 'codUser',
    description: 'ID numérico del usuario a eliminar',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente.' })
  @ApiResponse({ status: 406, description: 'Código no encontrado.' })
  public delete(@Param() parametro: any): any {
    const codigo: number = Number(parametro.codUser);

    if (!isNaN(codigo)) {
      return this.userService.eliminar(codigo);
    } else {
      throw new HttpException(
        'Código no encontrado',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  // =========================================================================
  // DESACTIVAR UN USUARIO (SOFT DELETE)
  // =========================================================================
  @Put('/sdelete/:codUser')
  @ApiOperation({
    summary: 'Desactivar un usuario (Soft Delete)',
    description:
      'Marca al usuario como inactivo sin borrarlo físicamente de la base de datos.',
  })
  @ApiParam({
    name: 'codUser',
    description: 'ID numérico del usuario a desactivar',
    type: Number,
  })
  @ApiBody({
    type: Users,
    description: 'Datos necesarios para el soft delete (ej. estado)',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario desactivado correctamente.',
  })
  @ApiResponse({ status: 406, description: 'Código de usuario no válido.' })
  public softdelete(
    @Body() objActualizar: Users,
    @Param() parametro: any,
  ): any {
    const codigo: number = Number(parametro.codUser);

    if (!isNaN(codigo)) {
      return this.userService.softdelete(objActualizar, codigo);
    } else {
      throw new HttpException(
        'Código de usuario no válido',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
}
