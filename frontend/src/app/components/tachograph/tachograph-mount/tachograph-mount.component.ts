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
  selector: "app-tachograph-mount",
  templateUrl: "./tachograph-mount.component.html",
  styleUrls: ["./tachograph-mount.component.scss"],
})
export class TachographMountComponent extends RequestBase implements OnInit {
  requestBody: any = {};
  personalData: any = {};
  passport: any = {};
  registrationData: any = {};
  vehicle: any = {};
  submit: any = {};

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
    this.personalData = this.requestBody.personalData;
    this.passport = this.requestBody.passport;
    this.registrationData = this.requestBody.registrationData;
    this.vehicle = this.requestBody.vehicle;
    this.submit = this.requestBody.submit;

    if (!this.personalData) {
      this.personalData = {};
    }

    if (!this.passport) {
      this.passport = {};
    }

    if (!this.registrationData) {
      this.registrationData = {};
    }

    if (!this.vehicle) {
      this.vehicle = {};
    }

    this.personalData.dateOfBirth = !_.isEmpty(this.personalData.dateOfBirth)
      ? new Date(this.personalData.dateOfBirth)
      : "";
    this.passport.dateOfIssue = !_.isEmpty(this.passport.dateOfIssue)
      ? new Date(this.passport.dateOfIssue)
      : "";
    this.vehicle.STSRegistrationDate = !_.isEmpty(this.vehicle.STSRegistrationDate)
      ? new Date(this.vehicle.STSRegistrationDate)
      : "";

  }

  async fillFormsFieldsFromUser(user: User): Promise<void> {
    this.personalData.phone = user.phone;
    this.personalData.organization = user.organization;
    this.personalData.firstName = user.firstName;
    this.personalData.lastName = user.lastName;
    this.personalData.patronymic = user.patronymic;
  }

  async onCreateButton(
    personalDataForm: NgForm,
    passportForm: NgForm,
    registrationDataForm: NgForm,
    vehicleForm: NgForm,
    submitForm: NgForm
  ) {
    this.loading.send = true;
    this.error = "";
    let request = new Request();
    request.status = RequestStatus.STATUS_NEW;
    request.type = RequestType.TYPE_INSTALL;
    request.category = RequestCategory.CATEGORY_TACHOGRAPH;
    request.body = {
      personalData: { ...personalDataForm.value },
      passport: { ...passportForm.value },
      registrationData: { ...registrationDataForm.value },
      vehicle: { ...vehicleForm.value },
      submit: {...submitForm.value}
    };
    await this.createRequest(request);
    this.loading.send = false;
  }
}
