import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConnectionModule } from './config/connection/connection/connection.module';
import { ModulesModule } from './modules/modules.module';
import { PublicModule } from './modules/public/public.module';
import { PrivateModule } from './modules/private/private.module';
import { Seguridad } from './middleware/seguridad/seguridad';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true, envFilePath:".env"}), ConnectionModule, ModulesModule, PublicModule, PrivateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(Seguridad).forRoutes({path :'/private/*' , method: RequestMethod.ALL});
  }
}
