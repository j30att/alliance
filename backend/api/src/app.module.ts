import { NotificationModule } from './notification/notification.module';
import { RequestModule } from './request/request.module';
import { UploadModule } from './upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SeederModule } from './common/database/seeder/seeder.module';
import { NotificationSeed } from './common/database/seeder/seeds/notification.seed';
import { ConsoleModule } from 'nestjs-console';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './common/config/database.config'

@Module({
  imports: [
    ConfigModule.forRoot({load:[databaseConfig]}),
    TypeOrmModule.forRoot({
      ...databaseConfig()
    }),
    UserModule,
    AuthModule,
    UploadModule,
    RequestModule,
    NotificationModule,
    SeederModule,
    ConsoleModule,
  ],
  controllers: [],
  providers: [NotificationSeed],
})

export class AppModule {}
