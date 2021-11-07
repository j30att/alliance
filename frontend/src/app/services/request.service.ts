import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from "@angular/router";
import * as _ from "lodash";
import { BehaviorSubject, Observable } from "rxjs";
import { first } from "rxjs/operators";
import { User } from "../models/user";
import { ApiService } from "./api.service";
import { UserService } from "./user.service";
import { RequestCategory, RequestType } from "../models/request";

@Injectable({
  providedIn: "root",
})
export class RequestService {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private activateRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.init();
  }

  init() {}

  async getRequestBodyOrUser(requestId) {
    if (requestId) {
      try {
        const response = await this.apiService.getRequest(requestId);
        const requestBody = response.body;
        return {
          requestBody: _.clone(requestBody),
          user: {},
        };
      } catch (err) {
        console.error(err);
        throw err;
      } finally {
      }
    } else {
      const user = this.userService.getUserStream().getValue();
      return {
        requestBody: null,
        user: _.clone(user),
      };
    }
  }

  async getRequestOrUser(requestId) {
    if (requestId) {
      try {
        const response = await this.apiService.getRequest(requestId);
        return {
          request: _.clone(response),
          user: {},
        };
      } catch (err) {
        console.error(err);
        throw err;
      } finally {
      }
    } else {
      const user = this.userService.getUserStream().getValue();
      return {
        request: null,
        user: _.clone(user),
      };
    }
  }

  goToRequest(category, type, id: number = 0, relatedNotification = null) {
    let notificationState = {
      state: {
        relatedNotification: relatedNotification,
      },
    };

    switch (category) {
      case RequestCategory.CATEGORY_GLONASS:
        if (type === RequestType.TYPE_INSTALL) {
          this.router.navigate(
            ["/glonass/mount", id > 0 ? id : ""],
            notificationState
          );
        }
        if (type === RequestType.TYPE_SERVICE) {
          this.router.navigate(
            ["/glonass/service", id > 0 ? id : ""],
            notificationState
          );
        }
        break;
      case RequestCategory.CATEGORY_TACHOGRAPH:
        switch (type) {
          case RequestType.TYPE_INSTALL:
            this.router.navigate(
              ["/tachograph/mount", id > 0 ? id : ""],
              notificationState
            );
            break;
          case RequestType.TYPE_SERVICE:
            this.router.navigate(
              ["/tachograph/service", id > 0 ? id : ""],
              notificationState
            );
            break;
          case RequestType.TYPE_CALIBRATION:
            this.router.navigate(
              ["/tachograph/calibration", id > 0 ? id : ""],
              notificationState
            );
            break;
          case RequestType.TYPE_CHANGE_SKZI:
            this.router.navigate(
              ["/tachograph/change_skzi", id > 0 ? id : ""],
              notificationState
            );
            break;
          case RequestType.TYPE_METROLOGICAL_VERIFY:
            this.router.navigate(
              ["/tachograph/verification", id > 0 ? id : ""],
              notificationState
            );
            break;
          case RequestType.TYPE_SKZI_DRIVER_CARD:
            this.router.navigate(
              ["/tachograph/cards/skzi/driver", id > 0 ? id : ""],
              notificationState
            );
            break;
          case RequestType.TYPE_ESTR_DRIVER_CARD:
            this.router.navigate(
              ["/tachograph/cards/estr/driver", id > 0 ? id : ""],
              notificationState
            );
            break;
          case RequestType.TYPE_SKZI_ORGANIZATION_CARD:
            this.router.navigate(
              ["/tachograph/cards/skzi/company", id > 0 ? id : ""],
              notificationState
            );
            break;
          case RequestType.TYPE_ESTR_ORGANIZATION_CARD:
            this.router.navigate(
              ["/tachograph/cards/estr/company", id > 0 ? id : ""],
              notificationState
            );
            break;
        }
        break;
    }
  }
}
