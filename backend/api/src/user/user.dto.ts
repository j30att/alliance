import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  id: number
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  phone: string
  @IsNotEmpty()
  firstName: string
  @IsNotEmpty()
  lastName: string
  @IsNotEmpty()
  patronymic: string
  @IsNotEmpty()
  organization: string
  @IsNotEmpty()
  position: string
  avatar: string
  password: string
}

export class AuthUserDto {
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  password: string
}
