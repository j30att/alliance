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
import { RequestBase } from "src/app/common/base-classes/requestBase";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: "app-tachograph-skzi-change",
  templateUrl: "./tachograph-skzi-change.component.html",
  styleUrls: ["./tachograph-skzi-change.component.scss"],
})
export class TachographSkziChangeComponent
  extends RequestBase
  implements OnInit
{
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
      "/tachograph/history"
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
    this.requestBody.firstName = user.firstName;
    this.requestBody.lastName = user.lastName;
    this.requestBody.patronymic = user.patronymic;
  }

  async onCreateButton(bodyForm: NgForm) {
    this.loading.send = true;
    this.error = "";
    let request = new Request();
    request.status = RequestStatus.STATUS_NEW;
    request.type = RequestType.TYPE_CHANGE_SKZI;
    request.category = RequestCategory.CATEGORY_TACHOGRAPH;
    request.body = {
      ...bodyForm.value,
    };
    await this.createRequest(request);
    this.loading.send = false;
  }
}
