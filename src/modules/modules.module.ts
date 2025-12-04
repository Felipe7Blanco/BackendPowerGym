import { Module } from '@nestjs/common';
import { PrivateModule } from './private/private.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [PrivateModule, PublicModule]
})
export class ModulesModule {}
