import { Body, Controller, Post } from '@nestjs/common';
import { AccesService } from './acces.service';
import { acces } from 'src/models/acces/acces';
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

@ApiTags('Acces')
@Controller('acces')
export class AccesController {
  constructor(private readonly accesService: AccesService) {}

  /**=============================================================
   * INICIAR SESIÓN
   **=============================================================*/
  @Post('/signin')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description: 'Crea un registro de inicio de sesión',
  })
  @ApiBody({ type: acces, description: 'Datos del acceso a iniciar sesión' }) // Indica qué modelo recibe
  @ApiResponse({ status: 201, description: 'Inicio de sesión exitoso' })
  public inicioSesion(@Body() objAcceso: acces): any {
    console.log('=== REQUEST EN CONTROLLER ===');
    console.log('Datos recibidos:', objAcceso);
    return this.accesService.sesion(objAcceso);
  }
}
