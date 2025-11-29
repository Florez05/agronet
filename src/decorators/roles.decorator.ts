// Libraries
import { SetMetadata } from '@nestjs/common';

// Enums
import { RolesEnum } from '@/enum';

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);
