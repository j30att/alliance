import { NotificationService } from '../../../../notification/notification.service';
import { NotificationStatus, NotificationType, RequestType, RequestCategory } from '../../../../notification/notification.entity';
import { Injectable } from '@nestjs/common';
import { NotificationDTO } from '../../../../notification/notification.dto';
import { RequestService } from '../../../../request/request.service';

const faker = require('faker');

@Injectable()
export class NotificationSeed {
  constructor(
    private requestService: RequestService,
    private notificationService: NotificationService) {
  }

  async seed(count) {
    const fakeNotify = await this.generateFakeData(count);
      await this.notificationService.create(fakeNotify).catch((error) => {
        console.log(error);
      });
  }

  getRandomInt(max): number {
    return Math.floor(Math.random() * max);
  }

  async generateFakeData(count: number) {
    const fakeNotify = []
    console.log('count',count, 'count')
    for (let i = 0; i < count; i++) {
      let request = await this.requestService.findOne(i+1);
      const item = {
        time: faker.date.recent(),
        message: faker.lorem.sentences(1),
        status: this.getStatus(),
        type: this.getType(),
        requestCategory:  request.category ? request.category : null,
        requestType:  request.type ? request.type: null ,
        requestNumber: +request.id % 3 === 0 ? +request.id : null,
      } as NotificationDTO
      fakeNotify.push(item)
    }
    return fakeNotify;
  }

  private getStatus(): NotificationStatus {
    const rand = this.getRandomInt(2)
    const enumValues = Object.keys(NotificationStatus)
    return NotificationStatus[enumValues[rand]];
  }

  private getType(): NotificationType {
    const rand = this.getRandomInt(3);
    switch (rand) {
      case 0:
        return NotificationType.TYPE_INFO
        break;

      case 1:
        return NotificationType.TYPE_ALERT
        break;

      case 2:
        return NotificationType.TYPE_WARNING
        break;

      default:
        return NotificationType.TYPE_INFO
        break;
    }
  }

  private getCategory() {
    const rand = this.getRandomInt(2)
    const enumValues = Object.keys(RequestCategory)
    return RequestCategory[enumValues[rand]];
  }

  private getRequestType() {
    const rand = this.getRandomInt(9)
    const enumValues = Object.keys(RequestType)
    return RequestType[enumValues[rand]]
  }
}
