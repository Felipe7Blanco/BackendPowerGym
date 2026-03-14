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
import { ProductsService } from './products.service';
import { Products } from 'src/models/products/products';

/**
 * Importación de swagger
 */
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Products') // Agrupa todos estos endpoints en la sección en Swagger
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  /**=========================================================================
   * Petición get todos
   * =========================================================================*/
  @Get('/all')
  @ApiOperation({
    summary: 'Obtener todos los productos',
    description:
      'Retorna una lista completa de todos los productos registrados en el sistema del gimnasio.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida exitosamente.',
  })
  public obtenerProducts(): any {
    //llamamos nuestro objeto de tipo service y el metodo de
    //mostrar todos
    return this.productService.consultar();
  }

  /**=========================================================================
   * Consultar uno
   * =========================================================================*/
  @Get('/get/:idProduct')
  @ApiOperation({
    summary: 'Consultar un producto específico',
    description: 'Busca y retorna los datos de un producto utilizando su ID.',
  })
  @ApiParam({
    name: 'idProduct',
    description: 'ID numérico del producto',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'producto encontrado exitosamente.',
  })
  @ApiResponse({ status: 406, description: 'Código de producto no válido.' })
  /**le pasamos un parametro, en este caso sera el id*/
  public consultarUno(@Param() parametro: any): any {
    const codProduct: number = Number(parametro.idProduct);
    /**si el Product existe nos dara una respuesta */
    if (!isNaN(codProduct)) {
      return this.productService.consultarUno(codProduct);
      /**de lo contrario nos arrojara un error */
    } else {
      return new HttpException(
        'codigo de Product no existente',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  /**=========================================================================
   * agregar un Product
   * =========================================================================*/
  @Post('/add')
  @ApiOperation({
    summary: 'Registrar un nuevo producto',
    description: 'Crea un nuevo producto en la base de datos.',
  })
  @ApiBody({ type: Products, description: 'Datos del producto a registrar' }) // Indica qué modelo recibe
  @ApiResponse({ status: 201, description: 'producto creado correctamente.' })
  /**parametor tipo body y atributos de la clase Product */
  public registrarProduct(@Body() objProduct: Products): any {
    return this.productService.registrar(objProduct);
  }

  /**=========================================================================
   * Actualizar el Product mediante parametro id
   * =========================================================================*/
  @Put('/update/:idProduct')
  @ApiOperation({
    summary: 'Actualizar un producto',
    description: 'Sobrescribe los datos de un producto existente según su ID.',
  })
  @ApiParam({
    name: 'codProduct',
    description: 'ID numérico del producto a actualizar',
    type: Number,
  })
  @ApiBody({ type: Products, description: 'Nuevos datos del producto' })
  @ApiResponse({
    status: 200,
    description: 'producto actualizado correctamente.',
  })
  @ApiResponse({ status: 406, description: 'Código de producto no válido.' })
  public actualizarProduct(
    @Body() objActualziar: Products,
    @Param() parametros: any,
  ): any {
    const codigo: number = Number(parametros.codProduct);
    if (!isNaN(codigo)) {
      return this.productService.actualizar(objActualziar, codigo);
    } else {
      return new HttpException(
        'Codgio de Product no valido',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  /**=========================================================================
   * Eliminar Product por id
   * =========================================================================*/
  @Delete('/delete/:idProduct')
  @ApiOperation({
    summary: 'Eliminar un producto físicamente',
    description:
      'Borra de forma permanente el registro del producto en la base de datos.',
  })
  @ApiParam({
    name: 'codProduct',
    description: 'ID numérico del producto a eliminar',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'producto eliminado correctamente.',
  })
  @ApiResponse({ status: 406, description: 'Código no encontrado.' })
  public delete(@Param() parametro: any): any {
    const codigo: number = Number(parametro.idProduct);
    if (!isNaN(codigo)) {
      return this.productService.eliminar(codigo);
    } else {
      return new HttpException(
        'Codigo no encontrado',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
  /**=========================================================================
   * soft delete para guardar el registro y desactivarlo
   * =========================================================================*/
  @Put('/sdelete/:idProduct')
  @ApiOperation({
    summary: 'Desactivar un producto (Soft Delete)',
    description:
      'Marca al producto como inactivo sin borrarlo físicamente de la base de datos.',
  })
  @ApiParam({
    name: 'codProduct',
    description: 'ID numérico del producto a desactivar',
    type: Number,
  })
  @ApiBody({
    type: Products,
    description: 'Datos necesarios para el soft delete (ej. estado)',
  })
  @ApiResponse({
    status: 200,
    description: 'producto desactivado correctamente.',
  })
  @ApiResponse({ status: 406, description: 'Código de producto no válido.' })
  public softdelete(
    @Body() objActualizar: Products,
    @Param() parametro: any,
  ): any {
    const codigo: number = Number(parametro.codProduct);
    if (!isNaN(codigo)) {
      return this.productService.softdelete(objActualizar, codigo);
    } else {
      return new HttpException(
        'codigo de producto no valido',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
}
