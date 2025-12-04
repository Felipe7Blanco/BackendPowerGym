import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { BillDetails } from 'src/models/billDetails/billdetails';
import { BilldetailsService } from './billdetails.service';

@Controller('billdetails')
export class BilldetailsController {

    constructor (private readonly billdservice: BilldetailsService){}
        
            //Petición get todos
            @Get("/all")
            public obtenerBillDetails():any{
                //llamamos nuestro objeto de tipo service y el metodo de
                //mostrar todos
                return this.billdservice.consultar();
            }
        
            /**Consultar uno */
            @Get("/get/:idBillDetails")
            /**le pasamos un parametro, en este caso sera el id*/
            public consultarUno(@Param() parametro:any):any{
                const codBillDetails: number = Number(parametro.idBillDetails);
                /**si el BillDetails existe nos dara una respuesta */
                if(!isNaN(codBillDetails)){
                    return this.billdservice.consultarUno(codBillDetails);
                    /**de lo contrario nos arrojara un error */
                } else {
                    return new HttpException("codigo de BillDetails no existente", HttpStatus.NOT_ACCEPTABLE);
                }
            }
        
            /**agregar un BillDetails */
            @Post("/add")
            /**parametor tipo body y atributos de la clase BillDetails */
            public registrarBillDetails(@Body() objBillDetails: BillDetails):any{
                return this.billdservice.registrar(objBillDetails);
            }
        
            
}
