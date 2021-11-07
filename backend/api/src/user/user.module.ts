import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController} from './user.controller';
import { UserService } from './user.service';
import { UserMapper } from './user.mapper';


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, UserMapper],
    exports: [UserService, UserMapper]
})
export class UserModule {}
