import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserMapper {
  public toUserDto(user: User): UserDto {
    return {
      id:           user.id,
      email:        user.email,
      phone:        user.phone,
      firstName:    user.firstName,
      lastName:     user.lastName,
      patronymic:   user.patronymic,
      organization: user.organization,
      position:     user.position,
      avatar:       user.avatar,
      password:     user.password
    } as UserDto
  }
}
