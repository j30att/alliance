import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AppError, AppErrorType } from '../error/app.error';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor( private readonly reflector: Reflector ) {
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    try {
      const isPublic = this.reflector.get<boolean>( "isPublic", context.getHandler() );
      if (isPublic){
        return true;
      }
      if (request.session.passport.user){
        return true;
      }
    } catch (e) {
      throw new AppError(AppErrorType.NOT_IN_SESSION);
    }
  }
}
