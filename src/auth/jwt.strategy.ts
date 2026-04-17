/**
 * JwtStrategy
 * Upgrade note: Implementa la estrategia JWT usando Passport para proteger rutas
 * privadas. Extrae el token de la cabecera Authorization (Bearer token) y valida
 * su firma usando la clave secreta configurada (ENV JWT_SECRET). Si es válido,
 * devuelve el payload para que pueda ser usado por guards/handlers.
 */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get('JWT_SECRET') || 'default_secret';
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    // Retornamos el payload tal cual o una versión reducida para el request
    // Esto se adjunta al request como req.user en los controladores protegidos
    return {
      userId: payload?.idUser ?? payload?.sub ?? payload?.userId,
      ...payload,
    };
  }
}
