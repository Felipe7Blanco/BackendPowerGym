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

@Controller('usermemberships')
export class UsermembershipsController {
  constructor(private readonly UMemService: UsermembershipsService) {}

  //Petición get todos
  @Get('/all')
  public obtenerUsermemberships(): any {
    //llamamos nuestro objeto de tipo service y el metodo de
    //mostrar todos
    return this.UMemService.consultar();
  }

  /**Consultar uno */
  @Get('/get/:idUserM')
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

  /**agregar un User */
  @Post('/add')
  /**parametor tipo body y atributos de la clase User */
  public registrarUser(@Body() objUser: Usermemberships): any {
    return this.UMemService.registrar(objUser);
  }

  /**Actualizar el User mediante parametro id */
  @Put('/update/:codUser')
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

  /**Eliminar User por id */
  @Delete('/delete/:codUser')
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
  /** soft delete para guardar el registro y desactivarlo */
  @Put('/sdelete/:codUser')
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
