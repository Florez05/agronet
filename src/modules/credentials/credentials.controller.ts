// Libraries
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { CredentialsService } from './credentials.service';

// Guards
import { AuthGuard, RolesGuard } from '@/guards';

// Decorators
import { Roles } from '@/decorators';

// Enums
import { RolesEnum } from '@/enum';

@ApiTags('Credenciales')
@Controller('credential')
export class CredentialsController {
    constructor(private readonly credentialService: CredentialsService) {}

    @Get('getCredentialByUsername')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Obtener la credencial por el userName' })
    @ApiResponse({
        status: 200,
        description: 'Credencial obtenida exitosamente',
    })
    @ApiNotFoundResponse({
        description: 'Esta credencial no existe',
    })
    @ApiQuery({
        name: 'userName',
        required: true,
        description: 'userName de la credencial a buscar',
        example: 'sergio.florez',
    })
    @ApiBearerAuth()
    getCredentialByUsername(@Query('userName') username: string) {
        return this.credentialService.getCredentialByUsernameService(username);
    }
}
