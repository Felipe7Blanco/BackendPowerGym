import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { MedicalreportsService } from './medicalreports.service';
import { MedicalRecords } from 'src/models/medical-records/medical-records';

@Controller('medicalreports')
export class MedicalreportsController {


    constructor (private readonly medicalService: MedicalreportsService){}
        
            //Petición get todos
            @Get("/all")
            public obtenerMedicals():any{
                //llamamos nuestro objeto de tipo service y el metodo de
                //mostrar todos
                return this.medicalService.consultar();
            }
        
            /**Consultar uno */
            @Get("/get/:idMedical")
            /**le pasamos un parametro, en este caso sera el id*/
            public consultarUno(@Param() parametro:any):any{
                const codMedical: number = Number(parametro.idMedical);
                /**si el Medical existe nos dara una respuesta */
                if(!isNaN(codMedical)){
                    return this.medicalService.consultarUno(codMedical);
                    /**de lo contrario nos arrojara un error */
                } else {
                    return new HttpException("codigo de Medical no existente", HttpStatus.NOT_ACCEPTABLE);
                }
            }
        
            /**agregar un Medical */
            @Post("/add")
            /**parametor tipo body y atributos de la clase Medical */
            public registrarMedical(@Body() objMedical: MedicalRecords):any{
                return this.medicalService.registrar(objMedical);
            }
        
            /**Actualizar el Medical mediante parametro id */
            @Put("/update/:idMedical")
            public actualizarMedical(@Body() objActualziar:MedicalRecords, @Param() parametros:any):any{
                const codigo: number = Number(parametros.idMedical);
                if(!isNaN(codigo)){
                    return this.medicalService.actualizar(objActualziar, codigo);
                } else{
                    return new HttpException("Codgio de Medical no valido", HttpStatus.NOT_ACCEPTABLE);
                }
            }
        
            /**Eliminar Medical por id */
            @Delete("/delete/:idMedical")
            public delete(@Param() parametro:any):any{
                const codigo:number = Number(parametro.idMedical);
                if(!isNaN(codigo)){
                    return this.medicalService.eliminar(codigo);
                }
                else{
                    return new HttpException("Codigo no encontrado", HttpStatus.NOT_ACCEPTABLE);
                }
            }
            /** soft delete para guardar el registro y desactivarlo */
           /**  @Put("/sdelete/:codMedical")
            public softdelete(@Body() objActualizar:MedicalRecords ,@Param() parametro:any):any{
                const codigo : number = Number(parametro.codMedical);
                if(!isNaN(codigo)){
                    return this.medicalService.actualizar(objActualizar, codigo);
                } else{
                    return new HttpException("codigo de usuario no valido", HttpStatus.NOT_ACCEPTABLE);
                }
            }
            */
}
