import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, timer, interval } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { Notification, NotificationStatus } from '../models/notification';

import differenceInSeconds from 'date-fns/differenceInSeconds'
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds'
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public notificationStream: BehaviorSubject<Notification[]> = new BehaviorSubject([])
  private notificationsAutoRefreshInterval: number = environment.notificationsAutoRefreshInterval;
  private notificationsStepRefreshInterval: number = environment.notificationsStepRefreshInterval;
  private timerStreamSubscription: Subscription = null;
  // private timerStream = timer(1000, 1000);
  private timerStream = interval(this.notificationsAutoRefreshInterval);
  private lastHandleTime = null

  public notificationCountStream: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(
    private apiService: ApiService,
    private userService: UserService) {
    this.init()
  }

  public init() {
    this.refresh()
  }

  public start() {
    if (!this.timerStreamSubscription) {
      this.timerStreamSubscription = this.timerStream.subscribe(async (val) => this.handler())
    }
  }

  public stop() {
    if (this.timerStreamSubscription) {
      this.timerStreamSubscription.unsubscribe()
      this.timerStreamSubscription = null
    }
  }

  public async refresh() : Promise<Notification []> {
    return await this.handler(false)
  }

  private async handler(rateCheck = true) : Promise<Notification []> | null{
    if (rateCheck && this.lastHandleTime && differenceInMilliseconds(new Date(), this.lastHandleTime) < this.notificationsStepRefreshInterval) {
      return
    } else {
      this.lastHandleTime = new Date()
    }

    try {
      const response = await this.apiService.notifications()
      let notifications = response.map((notification) => Notification.fromJSON(notification))

      this.notificationStream.next(notifications)

      let unreadNotificationCount = notifications.filter((notification) => {
        return notification.status === NotificationStatus.STATUS_UNREAD
      }).length

      this.notificationCountStream.next(unreadNotificationCount);

      return _.clone(notifications)
    }
    catch (err) {
      this.stop()
      this.userService.logout()
      console.error(err)
      return null
    }
    finally {
    }
  }

  getNotificationStream() {
    return this.notificationStream
  }

  getUnreadNotificationCountStream() {
    return this.notificationCountStream
  }

  async updateNotification(notification: Notification, refreshAllNotifications: boolean = false): Promise<any> {
    try {
      let updatedNotifications = await this.apiService.updateNotification(notification)
      let value = this.notificationCountStream.getValue()
      if (value > 0) {
        this.notificationCountStream.next(value - 1)
      }

      if (refreshAllNotifications) {
        await this.handler(false)
        return
      }

      return updatedNotifications;
    }
    catch (err) {
      console.error(err)
      throw err
    }
    finally {
    }
  }
}
