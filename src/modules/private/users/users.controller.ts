import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from 'src/models/users/users';

@Controller('users')
export class UsersController {

    constructor (private readonly userService: UsersService){}
    
        //Petición get todos
        @Get("/all")
        public obtenerUsers():any{
            //llamamos nuestro objeto de tipo service y el metodo de
            //mostrar todos
            return this.userService.consultar();
        }
    
        /**Consultar uno */
        @Get("/get/:idUser")
        /**le pasamos un parametro, en este caso sera el id*/
        public consultarUno(@Param() parametro:any):any{
            const codUser: number = Number(parametro.idUser);
            /**si el User existe nos dara una respuesta */
            if(!isNaN(codUser)){
                return this.userService.consultarUno(codUser);
                /**de lo contrario nos arrojara un error */
            } else {
                return new HttpException("codigo de User no existente", HttpStatus.NOT_ACCEPTABLE);
            }
        }
    
        /**agregar un User */
        @Post("/add")
        /**parametor tipo body y atributos de la clase User */
        public registrarUser(@Body() objUser: Users):any{
            return this.userService.registrar(objUser);
        }
    
        /**Actualizar el User mediante parametro id */
        @Put("/update/:codUser")
        public actualizarUser(@Body() objActualziar:Users, @Param() parametros:any):any{
            const codigo: number = Number(parametros.codUser);
            if(!isNaN(codigo)){
                return this.userService.actualizar(objActualziar, codigo);
            } else{
                return new HttpException("Codgio de User no valido", HttpStatus.NOT_ACCEPTABLE);
            }
        }
    
        /**Eliminar User por id */
        @Delete("/delete/:codUser")
        public delete(@Param() parametro:any):any{
            const codigo:number = Number(parametro.codUser);
            if(!isNaN(codigo)){
                return this.userService.eliminar(codigo);
            }
            else{
                return new HttpException("Codigo no encontrado", HttpStatus.NOT_ACCEPTABLE);
            }
        }
        /** soft delete para guardar el registro y desactivarlo */
        @Put("/sdelete/:codUser")
        public softdelete(@Body() objActualizar:Users ,@Param() parametro:any):any{
            const codigo : number = Number(parametro.codUser);
            if(!isNaN(codigo)){
                return this.userService.softdelete(objActualizar, codigo);
            } else{
                return new HttpException("codigo de usuario no valido", HttpStatus.NOT_ACCEPTABLE);
            }
        }

}
