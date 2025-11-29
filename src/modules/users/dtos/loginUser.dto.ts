// Libraries
import { PickType } from '@nestjs/swagger';

// Dtos
import { CreateUserDto } from './createUser.dto';

export class LoginUserDto extends PickType(CreateUserDto, ['userName', 'password']) {}
