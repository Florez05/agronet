// Libraries
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { CredentialsEntity } from '@/entities';

// Controllers, Services, Repositories
import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';
import { CredentialsRepository } from './credentials.repository';

@Module({
    imports: [TypeOrmModule.forFeature([CredentialsEntity])],
    controllers: [CredentialsController],
    providers: [CredentialsService, CredentialsRepository],
    exports: [CredentialsRepository],
})
export class CredentialsModule {}
