import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { acces } from 'src/models/acces/acces';
import { Users } from 'src/models/users/users';

@Controller('register')
export class RegisterController {
    constructor (private readonly registerService: RegisterService){
    }
    
    @Post('add')
    public registrarUser(@Body() datosRegistro: any):any{
        console.log('=== DATOS RECIBIDOS EN CONTROLLER ===');
        console.log('datosRegistro:', datosRegistro);
        
        // Ya no es necesario mapear manualmente porque las propiedades
        // ahora coinciden entre frontend y backend
        const objAcceso : acces = datosRegistro;
        const objUser : Users = datosRegistro;

        console.log('objUser a guardar:', objUser);
        console.log('objAcceso a guardar:', objAcceso);

        return this.registerService.newUser(objAcceso, objUser);
    }
}