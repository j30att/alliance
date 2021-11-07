import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { AppError } from '../error/app.error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>()

    if (exception instanceof AppError) {
      return response.status(exception.httpStatus).json({
        errorCode: exception.errorCode,
        errorMsg: exception.errorMessage,
        usrMsg: exception.userMessage,
        httpCode: exception.httpStatus
      });
    } else if (exception instanceof UnauthorizedException) {
      console.log(exception.message);
      console.error(exception.stack);
      return response.status(HttpStatus.UNAUTHORIZED).json(exception.message);
    } else if (exception.status === 403) {
      return response.status(HttpStatus.FORBIDDEN).json(exception.message);
    }
    else {
      console.error(exception.message);
      console.error(exception.stack);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

}
