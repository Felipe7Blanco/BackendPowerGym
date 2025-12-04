import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from 'src/models/roles/roles';

@Controller('roles')
export class RolesController {

    constructor (private readonly rolService: RolesService){}

    //Petición get todos
    @Get("/all")
    public obtenerRoles():any{
        //llamamos nuestro objeto de tipo service y el metodo de
        //mostrar todos
        return this.rolService.consultar();
    }

    /**Consultar uno */
    @Get("/get/:idRol")
    /**le pasamos un parametro, en este caso sera el uid*/
    public consultarUno(@Param() parametro:any):any{
        const codRol: number = Number(parametro.idRol);
        /**si el rol existe nos dara una respuesta */
        if(!isNaN(codRol)){
            return this.rolService.consultarUno(codRol);
            /**de lo contrario nos arrojara un error */
        } else {
            return new HttpException("codigo de rol no existente", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    /**agregar un rol */
    @Post("/add")
    /**parametor tipo body y atributos de la clase rol */
    public registrarRol(@Body() objROl: Roles):any{
        return this.rolService.registrar(objROl);
    }

    /**Actualizar el rol mediante parametro id */
    @Put("/update/:idRol")
    public actualizarRol(@Body() objActualziar:Roles, @Param() parametros:any):any{
        const codigo: number = Number(parametros.idRol);
        if(!isNaN(codigo)){
            return this.rolService.actualizar(objActualziar, codigo);
        } else{
            return new HttpException("Codgio de rol no valido", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    /**Eliminar rol por id */
    @Delete("/delete/:codROl")
    public delete(@Param() parametro:any):any{
        const codigo:number = Number(parametro.codROl);
        if(!isNaN(codigo)){
            return this.rolService.eliminar(codigo);
        }
        else{
            return new HttpException("Codigo no encontrado", HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
