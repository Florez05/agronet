// Enums
import { RolesEnum } from '@/enum';

export interface JwtPayload {
    id: string;
    role: RolesEnum;
    username: string;
    iat: number | Date;
    exp: number | Date;
}

export interface IRequestContext {
    user?: JwtPayload;
}
