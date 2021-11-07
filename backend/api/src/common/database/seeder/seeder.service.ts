import { Injectable, Logger } from '@nestjs/common';
import { NotificationSeed } from './seeds/notification.seed';
import { UserSeed } from './seeds/user.seed';
import { RequestSeed } from './seeds/request.seed';

@Injectable()
export class SeederService {
  constructor(
    private notificationSeed: NotificationSeed,
    private userSeed: UserSeed,
    private requestSeed: RequestSeed
  ) {
  }

  async seed(entity: string = '', count: number = 100) {
    switch (entity) {
      case 'Notification':
        await this.notificationSeed.seed(count)
        break;
      case 'User':
        await this.userSeed.seed(count)
        break;
      default:
        await this.userSeed.seed(count)
        await this.requestSeed.seed(count)
        await this.notificationSeed.seed(count)
        await this.requestSeed.relateNotification();
        break;
    }
  }
}
