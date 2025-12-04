import { Module } from '@nestjs/common';
import { AccesModule } from './acces/acces.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [AccesModule, RegisterModule]
})
export class PublicModule {}
