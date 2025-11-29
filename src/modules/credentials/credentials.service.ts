// Libraries
import { Injectable, NotFoundException } from '@nestjs/common';

// Repositories
import { CredentialsRepository } from './credentials.repository';

@Injectable()
export class CredentialsService {
    constructor(private readonly credentialRepository: CredentialsRepository) {}

    async getCredentialByUsernameService(username: string) {
        const credentialExiting = await this.credentialRepository.getCredentialByUsernameRepository(username);
        if (!credentialExiting) {
            throw new NotFoundException('Esta credencial no existe');
        }
        return credentialExiting;
    }
}
