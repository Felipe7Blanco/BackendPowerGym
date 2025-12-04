import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from 'src/models/products/products';

@Controller('products')
export class ProductsController {

    constructor (private readonly productService: ProductsService){}
        
            //Petición get todos
            @Get("/all")
            public obtenerProducts():any{
                //llamamos nuestro objeto de tipo service y el metodo de
                //mostrar todos
                return this.productService.consultar();
            }
        
            /**Consultar uno */
            @Get("/get/:idProduct")
            /**le pasamos un parametro, en este caso sera el id*/
            public consultarUno(@Param() parametro:any):any{
                const codProduct: number = Number(parametro.idProduct);
                /**si el Product existe nos dara una respuesta */
                if(!isNaN(codProduct)){
                    return this.productService.consultarUno(codProduct);
                    /**de lo contrario nos arrojara un error */
                } else {
                    return new HttpException("codigo de Product no existente", HttpStatus.NOT_ACCEPTABLE);
                }
            }
        
            /**agregar un Product */
            @Post("/add")
            /**parametor tipo body y atributos de la clase Product */
            public registrarProduct(@Body() objProduct: Products):any{
                return this.productService.registrar(objProduct);
            }
        
            /**Actualizar el Product mediante parametro id */
            @Put("/update/:idProduct")
            public actualizarProduct(@Body() objActualziar:Products, @Param() parametros:any):any{
                const codigo: number = Number(parametros.codProduct);
                if(!isNaN(codigo)){
                    return this.productService.actualizar(objActualziar, codigo);
                } else{
                    return new HttpException("Codgio de Product no valido", HttpStatus.NOT_ACCEPTABLE);
                }
            }
        
            /**Eliminar Product por id */
            @Delete("/delete/:idProduct")
            public delete(@Param() parametro:any):any{
                const codigo:number = Number(parametro.idProduct);
                if(!isNaN(codigo)){
                    return this.productService.eliminar(codigo);
                }
                else{
                    return new HttpException("Codigo no encontrado", HttpStatus.NOT_ACCEPTABLE);
                }
            }
            /** soft delete para guardar el registro y desactivarlo */
            @Put("/sdelete/:idProduct")
            public softdelete(@Body() objActualizar:Products ,@Param() parametro:any):any{
                const codigo : number = Number(parametro.codProduct);
                if(!isNaN(codigo)){
                    return this.productService.softdelete(objActualizar, codigo);
                } else{
                    return new HttpException("codigo de producto no valido", HttpStatus.NOT_ACCEPTABLE);
                }
            }
}
