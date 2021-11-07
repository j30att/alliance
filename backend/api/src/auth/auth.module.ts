import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './local.strategy';


@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, SessionSerializer, LocalStrategy],
})
export class AuthModule {
}
