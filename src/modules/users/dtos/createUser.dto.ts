// Libraries
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

// Enums
import { GenderEnum } from '@/enum';

export class CreateUserDto {
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    dateOfBirth: Date;
    gender: GenderEnum;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    @ApiProperty({
        description: 'Nombre de usuario para autenticación',
        example: 'sergio.florez',
    })
    @IsNotEmpty({
        message: 'El nombre de usuario es requerido',
    })
    @IsString({
        message: 'El nombre de usuario debe ser una cadena caracteres',
    })
    userName: string;

    @ApiProperty({
        description:
            'Contraseña del usuario (mínimo 8 caracteres, debe incluir mayúsculas, minúsculas, números y caracteres especiales)',
        example: 'securePass123!',
    })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/, {
        message:
            'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial',
    })
    password: string;
}
