// Libraries
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

// Enums
import { RolesEnum } from '@/enum';

// Interfaces
import { IRequestContext } from './IGuards';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest<IRequestContext>();
        const payload = request.user;
        const hasRole = requiredRoles.some(role => payload?.role?.includes(role));
        const validate = payload && payload.role && hasRole;

        console.log('Validaciones de roles:', {
            rolRequired: requiredRoles,
            infoUser: payload,
            validate: validate,
        });

        if (!validate) {
            throw new ForbiddenException('No tienes permisos para acceder a este contenido.');
        }
        return validate;
    }
}
