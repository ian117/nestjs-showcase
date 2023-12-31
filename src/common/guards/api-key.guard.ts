import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly configService: ConfigService,
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // Ir al Hanlder or Controller y verificar si es Public
        // Esto se logra accediendo a la metadata del Guard con Reflector
        const isPublic = this.reflector.get(
            IS_PUBLIC_KEY,
            context.getHandler(),
        );
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.header('Authorization');
        return authHeader === this.configService.get('API_KEY');
    }
}
