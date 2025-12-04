import { Module } from '@nestjs/common';
import { AccesService } from './acces.service';
import { AccesController } from './acces.controller';

@Module({
  providers: [AccesService],
  controllers: [AccesController]
})
export class AccesModule {}
