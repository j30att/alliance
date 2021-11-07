import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Notification } from './notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TransactionRepository } from 'typeorm';
import { NotificationDTO } from './notification.dto';

@Injectable()
export class NotificationService extends TypeOrmCrudService<Notification> {
  constructor(@InjectRepository(Notification) private notificationRepository: Repository<Notification>) {
    super(notificationRepository);
  }

  async create(data) {
    return await this.notificationRepository.save(data)
  }
}
