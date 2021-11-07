import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { filter, distinctUntilChanged, count } from 'rxjs/operators';
import * as _ from 'lodash';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification, NotificationStatus } from 'src/app/models/notification'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  userStreamSubscription: Subscription;
  notificationStreamSubscription: Subscription;
  unreadCountNotificationSubscription: Subscription;
  breadcrumbs: any[] = [];
  unreadNotificationCount = 0;

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.userStreamSubscription = this.userService.getUserStream().subscribe((user) => {
      this.user = user
    });

    this.unreadCountNotificationSubscription = this.notificationService.getUnreadNotificationCountStream().subscribe(
      (count) => {
        // console.log(count, 'countcount');
        this.unreadNotificationCount = count;
      }
    )
  }

  ngOnInit() {
    this.prepareBreadcrumbs(this.createBreadcrumbs(this.activatedRoute.root))
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        this.prepareBreadcrumbs(this.createBreadcrumbs(this.activatedRoute.root))
      });
  }

  ngOnDestroy() {
    this.userStreamSubscription.unsubscribe()
    this.unreadCountNotificationSubscription.unsubscribe()
  }

  prepareBreadcrumbs(breadcrumbs): void {
    this.breadcrumbs = _.uniqBy(breadcrumbs, 'url');
    this.breadcrumbs[this.breadcrumbs.length - 1].enable = false
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: any[] = [{ label: "Главная", url: "", enable: true }]): any[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[HeaderComponent.ROUTE_DATA_BREADCRUMB];
      if (!_.isEmpty(label)) {
        breadcrumbs.push({ label, url, enable: true });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }

  onLogoutClick(): void {
    this.userService.logout()
  }

}
