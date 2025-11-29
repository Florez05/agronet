// Libraries
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

// Interfaces
import { JwtPayload } from './IGuards';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request & { user?: JwtPayload } = context.switchToHttp().getRequest();

        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('El token es requerido.');
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new BadRequestException('Configuración del servidor incorrecta.');
        }

        try {
            const payload = this.jwtService.verify<JwtPayload>(token, { secret });
            payload.exp = new Date(Number(payload.exp) * 1000);
            payload.iat = new Date(Number(payload.iat) * 1000);

            if (!payload.role) {
                throw new UnauthorizedException('No tienes los permisos necesarios.');
            }
            request.user = payload;

            return true;
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException('El token ha expirado.');
            }
            if (error instanceof JsonWebTokenError) {
                throw new UnauthorizedException('Token Invalido.');
            }
            throw new UnauthorizedException('Error de autenticación.');
        }
    }
}
