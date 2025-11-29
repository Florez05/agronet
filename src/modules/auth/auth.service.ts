// Libraries
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

// DTOs
import { LoginUserDto } from '../users';

// Repositories
import { CredentialsRepository } from '../credentials';

@Injectable()
export class AuthService {
    constructor(
        private readonly credentialRepository: CredentialsRepository,
        private readonly jwtService: JwtService,
    ) {}

    async signInService(data: LoginUserDto) {
        const credentialExisting = await this.credentialRepository.getCredentialByUsernameRepository(data.userName);
        if (!credentialExisting) {
            throw new NotFoundException('Credenciales invalidas');
        }

        const validatePassword = await bcrypt.compare(data.password, credentialExisting.password);
        if (!validatePassword) {
            throw new NotFoundException('Credenciales Invalidas');
        }

        if (credentialExisting.userId.isActive === false) {
            throw new ConflictException('El usuario esta inactivo comuníquese con el administrador');
        }

        const payload = {
            id: credentialExisting.userId.uuid,
            role: credentialExisting.rol,
            username: credentialExisting.username,
        };

        const token = this.jwtService.sign(payload);
        return {
            message: 'Inicio de sesión exitoso',
            token,
        };
    }
}
