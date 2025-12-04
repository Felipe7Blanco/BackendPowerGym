import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { Memberships } from 'src/models/memberships/memberships';

@Controller('membership')
export class MembershipController {

    constructor (private readonly MemberService: MembershipService){}
        
            //Petición get todos
            @Get("/all")
            public obtenerMemberships():any{
                //llamamos nuestro objeto de tipo service y el metodo de
                //mostrar todos
                return this.MemberService.consultar();
            }
        
            /**Consultar uno */
            @Get("/get/:idMemberships")
            /**le pasamos un parametro, en este caso sera el id*/
            public consultarUno(@Param() parametro:any):any{
                const codMemberships: number = Number(parametro.idMemberships);
                /**si el Memberships existe nos dara una respuesta */
                if(!isNaN(codMemberships)){
                    return this.MemberService.consultarUno(codMemberships);
                    /**de lo contrario nos arrojara un error */
                } else {
                    return new HttpException("codigo de Memberships no existente", HttpStatus.NOT_ACCEPTABLE);
                }
            }
        
            /**agregar un Memberships */
            @Post("/add")
            /**parametor tipo body y atributos de la clase Memberships */
            public registrarMemberships(@Body() objMemberships: Memberships):any{
                return this.MemberService.registrar(objMemberships);
            }
        
            /**Actualizar el Memberships mediante parametro id */
            @Put("/update/:idMembership")
            public actualizarMemberships(@Body() objActualziar:Memberships, @Param() parametros:any):any{
                const codigo: number = Number(parametros.codMemberships);
                if(!isNaN(codigo)){
                    return this.MemberService.actualizar(objActualziar, codigo);
                } else{
                    return new HttpException("Codgio de Memberships no valido", HttpStatus.NOT_ACCEPTABLE);
                }
            }
        
            /**Eliminar Memberships por id */
            @Delete("/delete/:idMembership")
            public delete(@Param() parametro:any):any{
                const codigo:number = Number(parametro.idMembership);
                if(!isNaN(codigo)){
                    return this.MemberService.eliminar(codigo);
                }
                else{
                    return new HttpException("Codigo no encontrado", HttpStatus.NOT_ACCEPTABLE);
                }
            }
            /** soft delete para guardar el registro y desactivarlo */
            @Put("/sdelete/:idMembership")
            public softdelete(@Body() objActualizar:Memberships ,@Param() parametro:any):any{
                const codigo : number = Number(parametro.idMembership);
                if(!isNaN(codigo)){
                    return this.MemberService.actualizar(objActualizar, codigo);
                } else{
                    return new HttpException("codigo de membresia no valido", HttpStatus.NOT_ACCEPTABLE);
                }
            }
}
