import { Component, OnInit, OnDestroy } from "@angular/core";
import { User } from "src/app/models/user";
import { NgForm } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import {
  Request,
  RequestCategory,
  RequestStatus,
  RequestType,
} from "src/app/models/request";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "lodash";
import { RequestService } from "src/app/services/request.service";
import { ToastService } from "src/app/services/toast.service";
import { ButtonsGroupType } from "src/app/models/buttonsGroup";
import { RequestBase } from "src/app/common/base-classes/requestBase";

@Component({
  selector: "app-glonass-mount",
  templateUrl: "./glonass-mount.component.html",
  styleUrls: ["./glonass-mount.component.scss"],
})
export class GlonassMountComponent extends RequestBase implements OnInit {
  requestBody: any = {};

  constructor(
    apiService: ApiService,
    router: Router,
    activedRoute: ActivatedRoute,
    requestService: RequestService,
    toastService: ToastService
  ) {
    super(
      apiService,
      router,
      activedRoute,
      requestService,
      toastService,
      "/glonass/history"
    );
  }

  async ngOnInit(): Promise<void> {
    const requestId = this.activedRoute.snapshot.params.id;
    await this.initRequestForms(requestId);
  }

  async fillFormsFields(request: Request): Promise<void> {
    this.requestBody = _.clone(request.body);
  }

  async fillFormsFieldsFromUser(user: User): Promise<void> {
    this.requestBody.phone = user.phone;
    this.requestBody.organization = user.organization;
  }

  async onCreateButton(bodyForm: NgForm) {
    this.loading.send = true;
    this.error = "";
    let request = new Request();
    request.status = RequestStatus.STATUS_NEW;
    request.type = RequestType.TYPE_INSTALL;
    request.category = RequestCategory.CATEGORY_GLONASS;
    request.body = {
      ...bodyForm.value,
    };

    await this.createRequest(request);
    this.loading.send = false;
  }
}
