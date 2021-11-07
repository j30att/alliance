import { Injectable } from '@nestjs/common';
import { Notification, NotificationStatus } from './notification.entity';
import { NotificationDTO } from './notification.dto';

@Injectable()
export class NotificationMapper {

  public toNotificationDTO(notify: Notification): NotificationDTO {
    return {
      id:       notify.id,
      time:     notify.time,
      message:  notify.message,
      status:   notify.status,
      type:     notify.type
    } as NotificationDTO
  }
}
