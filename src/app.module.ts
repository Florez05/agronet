// Libraries
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Application
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Config
import typeorm from './config/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [typeorm],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const auxConfig: DataSourceOptions = config.get('typeorm')!;
                return { ...auxConfig, entities: ['dist/**/*.entity.js'] };
            },
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '9h' },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
