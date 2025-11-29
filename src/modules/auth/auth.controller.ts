// Libraries
import { Body, Controller, Post } from '@nestjs/common';
import { ApiConflictResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { AuthService } from './auth.service';

// DTOs
import { LoginUserDto } from '../users';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión de usuario' })
    @ApiResponse({
        status: 201,
        description: 'Inicio de sesión exitoso',
    })
    @ApiNotFoundResponse({
        description: 'Credenciales Invalidas',
    })
    @ApiConflictResponse({
        description: 'El usuario esta inactivo comuníquese con el administrador',
    })
    signIn(@Body() data: LoginUserDto) {
        return this.authService.signInService(data);
    }
}
