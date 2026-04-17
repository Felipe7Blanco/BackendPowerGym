/**
 * AuthModule
 * Centraliza la configuración de JWT y Passport para el proyecto.
 * Provee JwtModule, PassportModule, JwtStrategy y JwtAuthGuard para uso global.
 * Esto facilita la protección de rutas privadas y la generación/validación de tokens.
 */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1h' },
      global: true,
    }),
    ConfigModule,
  ],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [JwtModule, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
