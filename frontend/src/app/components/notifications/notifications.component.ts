import { Input, Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { Notification, NotificationStatus, NotificationType } from 'src/app/models/notification'
import { RequestCategory, RequestType } from '../../models/request';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnDestroy {
  // @Input() userName: string
  nonConfirmedAlertNotifications: Notification[] = []

  loading = false
  error: string = ''
  notifications: any[] = []
  notificationStreamSubscription: Subscription;

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private router: Router,
    private requestService: RequestService
  ) {
    this.notificationStreamSubscription = this.notificationService.getNotificationStream().subscribe((notifications) => {
      this.notifications = _.orderBy(_.clone(notifications), 'id', 'desc')

      const alertNotification = notifications.filter(notification => {
        return notification.status === NotificationStatus.STATUS_UNREAD && notification.type === NotificationType.TYPE_ALERT
      })

      this.nonConfirmedAlertNotifications = _.clone(alertNotification)
    })
  }

  ngOnDestroy() {
    this.notificationStreamSubscription.unsubscribe()
  }

  async onStart() {
    this.notificationService.start()
  }

  async onStop() {
    this.notificationService.stop()
  }

  async onRefresh() {
    this.notificationService.refresh()
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async onConfirmAlertNotifications() {
    try {
      this.loading = true
      for (let notification of this.nonConfirmedAlertNotifications) {
        notification.status = NotificationStatus.STATUS_READ
        await this.notificationService.updateNotification(notification)
      }

      await this.notificationService.refresh()
    } catch (err) {
      console.error(err)
      this.error = err.statusText ? err.statusText : err.message
    } finally {
      this.loading = false;
    }
  }

  async markRead(notification: Notification, $event) {
    if (notification.status === NotificationStatus.STATUS_UNREAD) {
      notification.status = NotificationStatus.STATUS_READ

      try {
        this.loading = true
        let notificationServer = await this.notificationService.updateNotification(notification, false)

        if(notificationServer && notification.type === NotificationType.TYPE_ALERT){
          let indexItem = 0;
          this.nonConfirmedAlertNotifications.forEach((item, index ) => {
            if(item.id === notificationServer.id){
              indexItem = index;
            }
          })
          this.nonConfirmedAlertNotifications.splice(indexItem, 1);
        }
      } catch (err) {
        console.error(err)
        this.error = err.statusText ? err.statusText : err.message
      } finally {
        this.loading = false;
      }
    }
  }

  createRequest(notification: Notification, $event) {
    $event.stopPropagation()
    if (
      notification.requestNumber === null &&
      notification.requestCategory &&
      notification.requestType
    ) {
      this.requestService.goToRequest(notification.requestCategory, notification.requestType, 0, notification)
    }
  }

  goToRequest(notification: any, $event: MouseEvent) {
    $event.stopPropagation()
    if (notification.requestNumber) {
      this.requestService.goToRequest(notification.requestCategory, notification.requestType, notification.requestNumber, notification)
    }
  }

  getTooltipText(type) {
    switch (type) {
      case 'goTo':
        return 'К заявке'

      case 'create':
        return 'Создать заявку'

      case 'envelope':
        return 'Отметить как прочитанное'

      case 'open-envelope':
        return 'Отметить как не прочитанное'
    }
  }

  showCreateRequest(notification: any) {
    return notification.requestType != null && notification.requestCategory != null && notification.requestNumber === null
  }

  showGoToRequest(notification: any) {
    return notification.requestNumber != null;
  }
}
