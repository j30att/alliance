import { Module } from '@nestjs/common';
import { NotificationModule } from '../../../notification/notification.module';
import { NotificationSeed } from './seeds/notification.seed';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { DatabaseSeedCommand } from '../../cli/database.seed.command';
import { UserModule } from '../../../user/user.module';
import { UserSeed } from './seeds/user.seed';
import { RequestSeed } from './seeds/request.seed';
import { RequestModule } from '../../../request/request.module';

@Module({
  imports: [TypeOrmModule.forFeature(), NotificationModule, UserModule, RequestModule],
  providers: [
    SeederService,
    NotificationSeed,
    UserSeed,
    RequestSeed,
    DatabaseSeedCommand
  ],
  exports: [DatabaseSeedCommand]
})
export class SeederModule {
}
