import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Lista blanca de rutas públicas que no requieren autenticación
  private readonly publicRoutes: Array<{ method: string; path: string }> = [
    { method: 'POST', path: '/acces/signin' },
    { method: 'POST', path: '/register/add' },
  ];

  canActivate(
    context: any,
  ): boolean | Promise<boolean> | import('rxjs').Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const path = request.url; // Esto incluye query params, pero nosotros solo nos importa el path base

    // Extraer el path sin query params
    const basePath = path.split('?')[0];

    // Verificar si la ruta está en la lista blanca
    const isPublicRoute = this.publicRoutes.some(
      (route) => route.method === method && route.path === basePath,
    );

    // Si es una ruta pública, permitir el paso sin autenticación
    if (isPublicRoute) {
      return true;
    }

    // De lo contrario, aplicar la autenticación JWT estándar
    return super.canActivate(context);
  }
}
