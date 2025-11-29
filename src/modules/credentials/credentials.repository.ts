// Libraries
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Entities
import { CredentialsEntity } from '@/entities';

@Injectable()
export class CredentialsRepository {
    constructor(
        @InjectRepository(CredentialsEntity)
        private readonly credentialDB: Repository<CredentialsEntity>,
    ) {}

    async getCredentialByUsernameRepository(username: string) {
        return await this.credentialDB.findOne({
            where: { username: username },
            relations: ['userId'],
        });
    }
}
