import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/models/user";
import { ApiService } from "src/app/services/api.service";
import { Request, RequestStatus } from "src/app/models/request";
import * as _ from "lodash";
import { RequestService } from "src/app/services/request.service";
import { ButtonsGroupType } from "src/app/models/buttonsGroup";
import { ToastService } from "src/app/services/toast.service";

export abstract class RequestBase {
  loading = {
    send: false,
    confirm: false,
    closing: false,
    reject: false,
    content: false,
  };
  error: string = "";
  request: Request = null;
  relatedNotificationId = 0;
  requestStatus: RequestStatus = RequestStatus.STATUS_NONE;
  requestCloseComment: string | null = null;
  // TODO: удалить
  // ButtonsGroupType = ButtonsGroupType;
  // buttonsGroupType = ButtonsGroupType.GROUP_NONE;

  constructor(
    public apiService: ApiService,
    public router: Router,
    public activedRoute: ActivatedRoute,
    public requestService: RequestService,
    public toastService: ToastService,
    public backUrl: string
  ) {
    // Получение идентификатора уведомления из стейта (при переходе со страницы уведомлений)
    if (
      _.has(this.router.getCurrentNavigation().extras, "state") &&
      _.has(
        this.router.getCurrentNavigation().extras.state,
        "relatedNotification"
      ) &&
      this.router.getCurrentNavigation().extras.state.relatedNotification
    ) {
      this.relatedNotificationId =
        this.router.getCurrentNavigation().extras.state.relatedNotification.id;
      console.log("relatedNotificationNumber", this.relatedNotificationId);
    }
  }

  abstract fillFormsFields(request: Request): Promise<void>;

  abstract fillFormsFieldsFromUser(user: User): Promise<void>;

  async initRequestForms(requestId: number | null): Promise<void> {
    try {
      this.loading.content = true;
      this.error = "";
      const requestOrUser = await this.requestService.getRequestOrUser(
        requestId
      );

      if (requestOrUser.request) {
        this.request = _.clone(requestOrUser.request);
        this.relatedNotificationId = requestOrUser.request.notificationNumber;
        await this.fillFormsFields(this.request);
      } else if (requestOrUser.user) {
        // значения по умолчанию
        const user = User.fromJSON(requestOrUser.user);
        await this.fillFormsFieldsFromUser(user);
      } else {
        throw new Error("что-то пошло не так");
      }

      // Удалить
      // this.updateButtonsGroup();

      if (this.request) {
        this.requestStatus = this.request.status;
        this.requestCloseComment = this.request.closeComment;
      } else {
        this.requestStatus = RequestStatus.STATUS_NONE;
        this.requestCloseComment = null;
      }
    } catch (err) {
      console.error(err);
      this.error = err.statusText ? err.statusText : err.message;
      this.toastService.showError(
        "Заявление",
        "Возникли проблемы при загрузке заявления"
      );
    } finally {
      this.loading.content = false;
    }
  }

  // TODO: удалить
  // updateButtonsGroup() {
  //   if (this.request) {
  //     switch (this.request.status) {
  //       case RequestStatus.STATUS_NEW:
  //       case RequestStatus.STATUS_ACTIVE:
  //       case RequestStatus.STATUS_FINESHED:
  //       case RequestStatus.STATUS_NONE:
  //       case RequestStatus.STATUS_REJECTED:
  //         this.buttonsGroupType = ButtonsGroupType.GROUP_BACK;
  //         break;
  //       case RequestStatus.STATUS_NOT_CONFIRMED:
  //         this.buttonsGroupType = ButtonsGroupType.GROUP_CONFIRM;
  //         break;
  //     }
  //   } else {
  //     this.buttonsGroupType = ButtonsGroupType.GROUP_SEND;
  //   }
  // }

  async createRequest(request: Request) {
    try {
      this.loading.send = true;
      this.error = "";

      const responseRequest = await this.apiService.createRequest(request);
      console.log("responseRequest", responseRequest);

      if (this.relatedNotificationId) {
        const responseNotification = await this.apiService.notificationReset(
          this.relatedNotificationId
        );
        console.log("responseNotification", responseNotification);
      }

      this.toastService.showSuccess("Заявление", "Заявление успешно создано");
      this.router.navigate([this.backUrl]);
    } catch (err) {
      console.error(err);
      this.error = err.statusText ? err.statusText : err.message;
    } finally {
      this.loading.send = false;
    }
  }

  onBackButton() {
    this.router.navigate([this.backUrl]);
  }

  async onConfirmButton() {
    try {
      this.loading.confirm = true;
      this.error = "";
      let request = _.clone(this.request);
      request.status = RequestStatus.STATUS_NEW;

      const responseRequest = await this.apiService.updateRequest(request);

      if (this.relatedNotificationId) {
        const responseNotification = await this.apiService.notificationReset(
          this.relatedNotificationId
        );
      }

      this.toastService.showSuccess(
        "Заявление",
        "Заявление успешно подтверждено"
      );
      this.router.navigate([this.backUrl]);
    } catch (err) {
      console.error(err);
      this.error = err.statusText ? err.statusText : err.message;
      this.toastService.showError(
        "Заявление",
        "Возникли проблемы при подтверждении заявления"
      );
    } finally {
      this.loading.confirm = false;
    }
  }

  async onRejectButton() {
    try {
      this.loading.reject = true;
      this.error = "";
      let request = _.clone(this.request);
      request.status = RequestStatus.STATUS_REJECTED;

      const responseRequest = await this.apiService.updateRequest(request);

      if (this.relatedNotificationId) {
        const responseNotification = await this.apiService.notificationReset(
          this.relatedNotificationId
        );
      }

      this.toastService.showSuccess("Заявление", "Заявление успешно отклонено");
      this.router.navigate([this.backUrl]);
    } catch (err) {
      console.error(err);
      this.error = err.statusText ? err.statusText : err.message;
      this.toastService.showError(
        "Заявление",
        "Возникли проблемы при отклонении заявления"
      );
    } finally {
      this.loading.reject = false;
    }
  }

  async onCloseRequestButton(comment) {
    try {
      this.loading.closing = true;
      this.error = "";
      let request = _.clone(this.request);
      request.status = RequestStatus.STATUS_REJECTED;
      request.closeComment = comment;

      const responseRequest = await this.apiService.updateRequest(request);

      if (this.relatedNotificationId) {
        const responseNotification = await this.apiService.notificationReset(
          this.relatedNotificationId
        );
      }

      this.toastService.showSuccess("Заявление", "Заявление успешно закрыто");
      this.router.navigate([this.backUrl]);
    } catch (err) {
      console.error(err);
      this.error = err.statusText ? err.statusText : err.message;
      this.toastService.showError(
        "Заявление",
        "Возникли проблемы при закрытии заявления"
      );
    } finally {
      this.loading.closing = false;
    }
  }
}
