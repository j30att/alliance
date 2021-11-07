import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/models/user";
import { ApiService } from "src/app/services/api.service";
import {
  Request,
  RequestCategory,
  RequestStatus,
  RequestType,
} from "src/app/models/request";
import { NgForm } from "@angular/forms";
import * as _ from "lodash";
import { RequestService } from "src/app/services/request.service";
import { ToastService } from "src/app/services/toast.service";
import { RequestBase } from "src/app/common/base-classes/requestBase";

@Component({
  selector: "app-glonass-service",
  templateUrl: "./glonass-service.component.html",
  styleUrls: ["./glonass-service.component.scss"],
})
export class GlonassServiceComponent extends RequestBase implements OnInit {
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
    this.requestBody.position = user.position;
    this.requestBody.firstName = user.firstName;
    this.requestBody.email = user.email;
  }

  async onCreateButton(bodyForm: NgForm) {
    this.loading.send = true;
    this.error = "";
    let request = new Request();
    request.status = RequestStatus.STATUS_NEW;
    request.type = RequestType.TYPE_SERVICE;
    request.category = RequestCategory.CATEGORY_GLONASS;
    request.body = {
      ...bodyForm.value,
    };
    await this.createRequest(request);
    this.loading.send = false;
  }
}
