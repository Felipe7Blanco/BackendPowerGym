import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AccesService } from './acces.service';
import { acces } from 'src/models/acces/acces';

@Controller('acces')
export class AccesController {
  constructor(private readonly accesService: AccesService) {}

  @Post('/signin')
  public inicioSesion(@Body() objAcceso: acces): any {
    console.log('=== REQUEST EN CONTROLLER ===');
    console.log('Datos recibidos:', objAcceso);
    return this.accesService.sesion(objAcceso);
  }
}