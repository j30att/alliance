import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Request, RequestStatus } from './request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { RequestDto } from './request.dto';

@Injectable()
export class RequestService extends TypeOrmCrudService<Request>{
  constructor(@InjectRepository(Request) private requestRepository: Repository<Request>) {
    super(requestRepository);
  }

  async create(data: RequestDto[]) {
    return await this.requestRepository.save(data)
  }

  async update(notification) {
    await getConnection()
      .createQueryBuilder()
      .update(Request)
      .set({
        notificationNumber: notification.id,
        status: RequestStatus.STATUS_NOT_CONFIRMED,
      })
      .where("id = :id", {
        id: notification.requestNumber})
      .execute();
  }
}
