import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDto } from './register.dto';
import { acces } from 'src/models/acces/acces';
import { Users } from 'src/models/users/users';

/**
 * Importación de swagger
 */
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Register')
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @ApiOperation({
    summary: 'Registrar un nuevo usuario',
    description: 'Crea un nuevo usuario en la base de datos.',
  })
  @ApiBody({
    type: RegisterDto,
    description: 'Datos del usuario y acceso a registrar',
  })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente.' })
  @Post('add')
  public registrarUser(@Body() datosRegistro: RegisterDto): any {
    console.log('=== DATOS RECIBIDOS EN CONTROLLER ===');
    console.log('datosRegistro:', datosRegistro);

    // Mapear a entidades separadas para el servicio
    const objAcceso: acces = {
      nameAcces: datosRegistro.nameAcces,
      passwordAccess: datosRegistro.passwordAccess,
      // idUser will be set by service after user creation
    } as unknown as acces;

    const objUser: Users = {
      nameUser: datosRegistro.nameUser,
      lastnameUser: datosRegistro.lastnameUser,
      identificationUser: datosRegistro.identificationUser,
      phoneUser: datosRegistro.phoneUser,
      dateUser: datosRegistro.dateUser,
      epsUser: datosRegistro.epsUser,
      medicalHistoryUser: datosRegistro.medicalHistoryUser,
      statusUser: datosRegistro.statusUser,
      genderUser: datosRegistro.genderUser,
      idRolUser: datosRegistro.idRolUser,
    } as unknown as Users;

    console.log('objUser a guardar:', objUser);
    console.log('objAcceso a guardar:', objAcceso);

    return this.registerService.newUser(objAcceso, objUser);
  }
}
