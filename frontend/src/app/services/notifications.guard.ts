import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from './notification.service';
import { Notification, NotificationStatus, NotificationType } from 'src/app/models/notification'


@Injectable({
  providedIn: 'root',
})
export class NotificationsGuard implements CanActivate {
  notificationStreamSubscription: Subscription;

  constructor(
    public router: Router,
    private notificationService: NotificationService
  ) {
    console.log('canActivate constructor')
    // this.notificationStreamSubscription = this.notificationService.getNotificationStream().subscribe((notifications) => {
    //   console.log('notifications', notifications)
    //   this.router.navigate(['notifications']);
    // })

  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    let notifications = await this.notificationService.refresh()

    const alertNotification = notifications.filter(notification => {
      return notification.status === NotificationStatus.STATUS_UNREAD && notification.type === NotificationType.TYPE_ALERT
    })

    if (alertNotification.length > 0) {
      this.router.navigate(['notifications']);
    }

    return true;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
