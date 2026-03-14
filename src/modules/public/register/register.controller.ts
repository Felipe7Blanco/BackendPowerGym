import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { acces } from 'src/models/acces/acces';
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

@ApiTags('Register')
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @ApiOperation({
    summary: 'Registrar un nuevo usuario',
    description: 'Crea un nuevo usuario en la base de datos.',
  })
  @ApiBody({ type: Users, description: 'Datos del usuario a registrar' }) 
  @ApiBody({ type: acces, description: 'Datos inicio de sesión' }) 
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente.' })
  @Post('add')
  public registrarUser(@Body() datosRegistro: any): any {
    console.log('=== DATOS RECIBIDOS EN CONTROLLER ===');
    console.log('datosRegistro:', datosRegistro);

    // Ya no es necesario mapear manualmente porque las propiedades
    // ahora coinciden entre frontend y backend
    const objAcceso: acces = datosRegistro;
    const objUser: Users = datosRegistro;

    console.log('objUser a guardar:', objUser);
    console.log('objAcceso a guardar:', objAcceso);

    return this.registerService.newUser(objAcceso, objUser);
  }
}
