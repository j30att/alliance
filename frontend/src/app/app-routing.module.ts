import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/authorization/signin/signin.component';
import { ButtsComponent } from './components/butts/butts.component';
import { GlonassComponent } from './components/glonass/glonass/glonass.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StubComponent } from './components/stub/stub.component';
import { TachographCalibrationComponent } from './components/tachograph/tachograph-calibration/tachograph-calibration.component';
import { TachographHistoryComponent } from './components/tachograph/tachograph-history/tachograph-history.component';
import { TachographCardsComponent } from './components/tachograph/tachograph-cards/tachograph-cards/tachograph-cards.component';
import { TachographMountComponent } from './components/tachograph/tachograph-mount/tachograph-mount.component';
import { TachographServiceComponent } from './components/tachograph/tachograph-service/tachograph-service.component';
import { TachographSkziChangeComponent } from './components/tachograph/tachograph-skzi-change/tachograph-skzi-change.component';
import { TachographVerificationComponent } from './components/tachograph/tachograph-verification/tachograph-verification.component';
import { TachographComponent } from './components/tachograph/tachograph/tachograph.component';
// import { AuthGuard } from './services/auth/auth-guard/auth.guard';
import { TachographSkziCardsComponent } from './components/tachograph/tachograph-cards/tachograph-skzi-cards/tachograph-skzi-cards.component';
import { TachographEstrCardsComponent } from './components/tachograph/tachograph-cards/tachograph-estr-cards/tachograph-estr-cards.component';
import { TachographSkziDriverCardComponent } from './components/tachograph/tachograph-cards/tachograph-skzi-driver-card/tachograph-skzi-driver-card.component';
import { TachographSkziCompanyCardComponent } from './components/tachograph/tachograph-cards/tachograph-skzi-company-card/tachograph-skzi-company-card.component';
import { TachographEstrDriverCardComponent } from './components/tachograph/tachograph-cards/tachograph-estr-driver-card/tachograph-estr-driver-card.component';
import { TachographEstrCompanyCardComponent } from './components/tachograph/tachograph-cards/tachograph-estr-company-card/tachograph-estr-company-card.component';
import { GlonassHistoryComponent } from './components/glonass/glonass-history/glonass-history.component';
import { GlonassMountComponent } from './components/glonass/glonass-mount/glonass-mount.component';
import { GlonassServiceComponent } from './components/glonass/glonass-service/glonass-service.component';
import { NotificationsGuard } from './services/notifications.guard';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SigninComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Base
      {
        path: 'profile',
        data: {
          breadcrumb: 'Профиль'
        },
        component: ProfileComponent,
        pathMatch: 'full',
        canActivate: [NotificationsGuard],
      },
      {
        path: 'notifications',
        data: {
          breadcrumb: 'Уведомления'
        },
        component: NotificationsComponent,
        pathMatch: 'full',
      },
      // Tachograph
      {
        path: 'tachograph',
        data: {
          breadcrumb: 'Тахография'
        },
        children: [
          {
            path: '',
            component: TachographComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
          {
            path: 'history',
            data: {
              breadcrumb: 'История'
            },
            component: TachographHistoryComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
          {
            path: 'mount',
            data: {
              breadcrumb: 'Монтаж'
            },
            component: TachographMountComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
          {
            path: 'mount/:id',
            data: {
              breadcrumb: 'Монтаж'
            },
            component: TachographMountComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
          {
            path: 'service',
            data: {
              breadcrumb: 'Сервис'
            },
            component: TachographServiceComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
          {
            path: 'service/:id',
            data: {
              breadcrumb: 'Сервис'
            },
            component: TachographServiceComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
          {
            path: 'calibration',
            data: {
              breadcrumb: 'Клибровка'
            },
            component: TachographCalibrationComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
          {
            path: 'calibration/:id',
            data: {
              breadcrumb: 'Клибровка'
            },
            component: TachographCalibrationComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
          {
            path: 'change_skzi',
            data: {
              breadcrumb: 'Замена СКЗИ'
            },
            component: TachographSkziChangeComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
          {
            path: 'change_skzi/:id',
            data: {
              breadcrumb: 'Замена СКЗИ'
            },
            component: TachographSkziChangeComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
          {
            path: 'verification',
            data: {
              breadcrumb: 'Поверка'
            },
            component: TachographVerificationComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
          {
            path: 'verification/:id',
            data: {
              breadcrumb: 'Поверка'
            },
            component: TachographVerificationComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
          {
            path: 'cards',
            data: {
              breadcrumb: 'Карты'
            },
            children: [
              {
                path: '',
                component: TachographCardsComponent,
                pathMatch: 'full',
                canActivate: [NotificationsGuard],
              },
              {
                path: 'skzi',
                data: {
                  breadcrumb: 'СКЗИ'
                },
                children: [
                  {
                    path: '',
                    component: TachographSkziCardsComponent,
                    pathMatch: 'full',
                    canActivate: [NotificationsGuard],
                  },
                  {
                    path: 'driver',
                    data: {
                      breadcrumb: 'Водитель'
                    },
                    component: TachographSkziDriverCardComponent,
                    pathMatch: 'full',
                    canActivate: [NotificationsGuard],
                  },
                  {
                    path: 'driver/:id',
                    data: {
                      breadcrumb: 'Водитель'
                    },
                    component: TachographSkziDriverCardComponent,
                    pathMatch: 'full',
                    canActivate: [NotificationsGuard],
                  },
                  {
                    path: 'company',
                    data: {
                      breadcrumb: 'Предприятие'
                    },
                    component: TachographSkziCompanyCardComponent,
                    pathMatch: 'full',
                    canActivate: [NotificationsGuard],
                  },
                  {
                    path: 'company/:id',
                    data: {
                      breadcrumb: 'Предприятие'
                    },
                    component: TachographSkziCompanyCardComponent,
                    pathMatch: 'full',
                    canActivate: [NotificationsGuard],
                  },
                ]
              },
              {
                path: 'estr',
                data: {
                  breadcrumb: 'ЕСТР'
                },
                children: [
                  {
                    path: '',
                    component: TachographEstrCardsComponent,
                    pathMatch: 'full',
                    canActivate: [NotificationsGuard],
                  },
                  {
                    path: 'driver',
                    data: {
                      breadcrumb: 'Водитель'
                    },
                    component: TachographEstrDriverCardComponent,
                    pathMatch: 'full',
                    canActivate: [NotificationsGuard],
                  },
                  {
                    path: 'driver/:id',
                    data: {
                      breadcrumb: 'Водитель'
                    },
                    component: TachographEstrDriverCardComponent,
                    pathMatch: 'full',
                    canActivate: [NotificationsGuard],
                  },
                  {
                    path: 'company',
                    data: {
                      breadcrumb: 'Предприятие'
                    },
                    component: TachographEstrCompanyCardComponent,
                    pathMatch: 'full',
                    canActivate: [NotificationsGuard],
                  },
                  {
                    path: 'company/:id',
                    data: {
                      breadcrumb: 'Предприятие'
                    },
                    component: TachographEstrCompanyCardComponent,
                    pathMatch: 'full',
                    canActivate: [NotificationsGuard],
                  },
                ]
              }
            ]
          }
        ]
      },

      // Glonass
      {
        path: 'glonass',
        data: {
          breadcrumb: 'Глонасс'
        },
        children: [
          {
            path: '',
            component: GlonassComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
          {
            path: 'history',
            data: {
              breadcrumb: 'История'
            },
            component: GlonassHistoryComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
          {
            path: 'mount',
            data: {
              breadcrumb: 'Монтаж'
            },
            component: GlonassMountComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
          {
            path: 'mount/:id',
            data: {
              breadcrumb: 'Монтаж'
            },
            component: GlonassMountComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
          {
            path: 'service',
            data: {
              breadcrumb: 'Сервис'
            },
            component: GlonassServiceComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
          {
            path: 'service/:id',
            data: {
              breadcrumb: 'Сервис'
            },
            component: GlonassServiceComponent,
            pathMatch: 'full',
            canActivate: [NotificationsGuard],
          },
        ]
      },
      {
        path: 'stub/:id',
        component: StubComponent,
        pathMatch: 'full',
      },
      {
        path: 'stub',
        component: StubComponent,
        pathMatch: 'full',
      },
      {
        path: 'butts',
        component: ButtsComponent,
        pathMatch: 'full',
      },
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        canActivate: [NotificationsGuard],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
