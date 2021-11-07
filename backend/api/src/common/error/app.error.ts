import { HttpStatus } from '@nestjs/common';

export interface IErrorMessage {
  type: AppErrorType;
  httpStatus: HttpStatus;
  errorMessage: string;
  userMessage: string;
}

export enum AppErrorType {
  USER_NOT_FOUND,
  USER_EXISTS,
  NOT_IN_SESSION,
  NO_USERS_IN_DB,
  WRONG_PASSWORD
}

export class AppError extends Error {

  public errorCode: AppErrorType;
  public httpStatus: number;
  public errorMessage: string;
  public userMessage: string;

  constructor(errorCode: AppErrorType) {
    super();

    const errorMessageConfig: IErrorMessage = this.getError(errorCode);
    if (!errorMessageConfig) throw new Error('Unable to find message code error.');

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.httpStatus = errorMessageConfig.httpStatus;
    this.errorCode = errorCode;
    this.errorMessage = errorMessageConfig.errorMessage;
    this.userMessage = errorMessageConfig.userMessage;
  }

  private getError(errorCode: AppErrorType): IErrorMessage {

    let res: IErrorMessage

    switch (errorCode) {
      case AppErrorType.USER_NOT_FOUND:
        res = {
          type: AppErrorType.USER_NOT_FOUND,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: 'Пользователь не найден',
          userMessage: 'Не возможно найти пользователя с указанными учетными данными'
        };
        break;
      case AppErrorType.NOT_IN_SESSION:
        res = {
          type: AppErrorType.NOT_IN_SESSION,
          httpStatus: HttpStatus.UNAUTHORIZED,
          errorMessage: 'Сессия отсутствует',
          userMessage: 'Сессия отсутствует или истекла'
        };
        break;
      case AppErrorType.WRONG_PASSWORD:
        res = {
          type: AppErrorType.WRONG_PASSWORD,
          httpStatus: HttpStatus.UNAUTHORIZED,
          errorMessage: 'Не верный пароль',
          userMessage: 'Не верный пароль'
        };
        break;
    }
    return res;
  }
}
