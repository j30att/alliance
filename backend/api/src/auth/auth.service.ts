import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AppError, AppErrorType } from '../common/error/app.error';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUser(username);
    if (!user) {
      throw new AppError(AppErrorType.USER_NOT_FOUND);
    }
    if (user && user.password === pass) {
      const {password, ...result} = user;
      return result;
    }
    throw new AppError(AppErrorType.WRONG_PASSWORD);
  }
}
