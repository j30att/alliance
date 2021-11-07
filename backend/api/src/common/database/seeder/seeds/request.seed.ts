import { Injectable } from '@nestjs/common';
import { RequestService } from '../../../../request/request.service';
import { RequestDto } from '../../../../request/request.dto';
import { RequestCategory, RequestStatus, RequestType } from '../../../../request/request.entity';
import { NotificationService } from '../../../../notification/notification.service';
import { IsNull, Not } from 'typeorm';

const faker = require('faker');

@Injectable()
export class RequestSeed {
  constructor(
    private requestService: RequestService,
    private notificationService: NotificationService,
  ) {
  }

  async seed(count: number) {
    const fakeRequests = this.generateFakeUserData(count);
    await this.requestService.create(fakeRequests).catch((error) => {
      console.log(error);
    });
  }

  private generateFakeUserData(count: number): RequestDto[] {
    const fakeRequests = []
    for (let i = 0; i < count; i++) {
      const category = this.getCategory();
      const item = {
        created_at: faker.date.past(),
        notificationNumber: null,
        number: this.getRandomInt(1000),
        contractor: faker.company.companyName(),
        vehicle: faker.vehicle.vehicle(),
        status: this.getStatus(),
        type: this.getType(category),
        category: category,
        worker: `${faker.name.prefix()} ${faker.name.lastName()}`,
        description: faker.lorem.sentence(1),
        ended_at: faker.date.past(),
        closeComment: null,
        body: {}
      } as RequestDto
      fakeRequests.push(item)
    }
    return fakeRequests;
  }

  getStatus(): RequestStatus {
    const rand = this.getRandomInt(3)
    const enumValues = Object.keys(RequestStatus)
    return RequestType[enumValues[rand]]
  }

  getType(category: RequestCategory): RequestType {

    if (category === RequestCategory.CATEGORY_GLONASS) {
      let rand = this.getRandomInt(2)
      const enumValues = Object.keys(RequestType)
      return RequestType[enumValues[rand]]
    } else {
      let rand = this.getRandomInt(8)
      const enumValues = Object.keys(RequestType)
      return RequestType[enumValues[rand]]
    }

  }

  getCategory(): RequestCategory {
    const rand = this.getRandomInt(2)
    const enumValues = Object.keys(RequestCategory)
    return RequestCategory[enumValues[rand]]
  }

  getRandomInt(max): number {
    return Math.floor(Math.random() * max);
  }

  async relateNotification() {
    const notification = await this.getRelatedNotification()
    notification.forEach( async (item) => await this.linkTo(item))
  }

  private async linkTo(item) {
    await this.requestService.update(item)
  }

  private async getRelatedNotification() {
    return await this.notificationService.find({where: {requestNumber: Not(IsNull())}});
  }
}
