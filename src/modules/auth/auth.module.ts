// Libraries
import { Module } from '@nestjs/common';

// Controllers, Services
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// Modules
import { CredentialsModule } from '../credentials';

@Module({
    imports: [CredentialsModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
