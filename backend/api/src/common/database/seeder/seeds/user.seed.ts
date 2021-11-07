import { Injectable } from '@nestjs/common';
import { UserService } from '../../../../user/user.service';
import { UserDto } from '../../../../user/user.dto';

const faker = require('faker');

@Injectable()
export class UserSeed {
  constructor(private userService: UserService) {
  }

  async seed(count: number) {
    const fakeUsers = this.generateFakeUserData(count);
    await this.userService.create(fakeUsers).catch((error) => {
      console.log(error);
    });
  }

  private generateFakeUserData(count: number): UserDto[] {
    const fakeUsers = []
    for (let i = 0; i < count; i++) {
      const item = {
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        patronymic: faker.name.middleName(),
        organization: faker.company.companyName(),
        position: faker.name.jobDescriptor(),
        avatar: faker.random.image(),
        password: faker.random.word(),
      } as UserDto
      fakeUsers.push(item)
    }
    return fakeUsers;
  }
}
