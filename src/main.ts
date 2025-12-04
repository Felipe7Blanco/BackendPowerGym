import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const port = Number(process.env.PORT_SERVER) || 3000;
  const app = await NestFactory.create(AppModule);


  /**Middleware para el manejo de peticiones */
  app.use(json({limit: '50mb'}));
  app.use(urlencoded({ extended: true}));

  /**Habilitar CORS si es necesario */
  app.enableCors();

  /**Manejo de errores global */
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
      message: 'ocurrio un error en el servidor'});
  });

  await app.listen(port, ()=> {
    console.log('servidor funcionando en el puerto: ' +port)
  });
}
bootstrap().catch((error) => {
  console.error('Error al iniciar el servidor:', error);
});
