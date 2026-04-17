import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
/** importación de swagger */
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { error } from 'console';

/** Fin de importaciones */
async function bootstrap() {
  const port = Number(process.env.PORT_SERVER) || 3000;
  const app = await NestFactory.create(AppModule);

  // 1. Crear la configuración base de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Power Gym')
    .setDescription(
      'Documentación oficial del backend para el sistema de gestión del gimnasio.',
    )
    .setVersion('1.0')
    // Si manejas autenticación con JWT, esto añade el botón de "Authorize"
    .addBearerAuth()
    .build();

  // 2. Crear el documento a partir de la configuración
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  // 3. Montar la interfaz gráfica de Swagger en una ruta específica
  SwaggerModule.setup('api/docs', app, documentFactory);

  /** Middleware para el manejo de peticiones */
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true }));

  /** Habilitar CORS si es necesario */
  app.enableCors();

  /** Manejo de errores global */
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
      message: 'ocurrió un error en el servidor',
    });
  });

  // 4. Iniciar la aplicación (¡Único llamado a listen al final!)
  await app.listen(port, () => {
    try {
      console.log(`Servidor de Power Gym funcionando en el puerto: ${port}`);
    console.log(
      `Documentación Swagger disponible en: http://localhost:${port}/api/docs`,

    );
    } catch (miError) {
      console.log(miError)
    }
    
    
  });
}

bootstrap().catch((error) => {
  console.error('Error al iniciar el servidor:', error);
});
