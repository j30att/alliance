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
import { UploadedFile } from "src/app/models/uploadedFile";
import { RequestBase } from "src/app/common/base-classes/requestBase";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: "app-tachograph-skzi-company-card",
  templateUrl: "./tachograph-skzi-company-card.component.html",
  styleUrls: ["./tachograph-skzi-company-card.component.scss"],
})
export class TachographSkziCompanyCardComponent
  extends RequestBase
  implements OnInit
{
  uploading = false;
  requestBody: any = {};
  personalData: any = {};
  passport: any = {};
  carOwnerRegisterData: any = {};
  uploadedFiles: UploadedFile[] = [];

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
    this.carOwnerRegisterData = this.requestBody.carOwnerRegisterData;
    this.uploadedFiles = _.clone(this.requestBody.uploadedFiles);

    if (!this.personalData) {
      this.personalData = {};
    }

    if (!this.passport) {
      this.passport = {};
    }

    if (!this.carOwnerRegisterData) {
      this.carOwnerRegisterData = {};
    }

    this.personalData.dateOfBirth = !_.isEmpty(this.personalData.dateOfBirth)
      ? new Date(this.personalData.dateOfBirth)
      : "";

    this.passport.dateOfIssue = !_.isEmpty(this.passport.dateOfIssue)
      ? new Date(this.passport.dateOfIssue)
      : "";
    this.carOwnerRegisterData.documentDateOfIssue = !_.isEmpty(
      this.carOwnerRegisterData.documentDateOfIssue
    )
      ? new Date(this.carOwnerRegisterData.documentDateOfIssue)
      : "";
    this.carOwnerRegisterData.responsibleDocumentDateOfIssue = !_.isEmpty(
      this.carOwnerRegisterData.responsibleDocumentDateOfIssue
    )
      ? new Date(this.carOwnerRegisterData.responsibleDocumentDateOfIssue)
      : "";
  }

  async fillFormsFieldsFromUser(user: User): Promise<void> {
    this.personalData.phone = user.phone;
    this.personalData.position = user.position;
    this.personalData.organization = user.organization;
    this.personalData.firstName = user.firstName;
    this.personalData.lastName = user.lastName;
    this.personalData.patronymic = user.patronymic;
    this.personalData.email = user.email;
  }

  async onCreateButton(
    personalDataForm: NgForm,
    passportForm: NgForm,
    carOwnerRegisterDataForm: NgForm
  ) {
    this.loading.send = true;
    this.error = "";
    let request = new Request();
    request.status = RequestStatus.STATUS_NEW;
    request.type = RequestType.TYPE_SKZI_ORGANIZATION_CARD;
    request.category = RequestCategory.CATEGORY_TACHOGRAPH;
    request.body = {
      personalData: { ...personalDataForm.value },
      passport: { ...passportForm.value },
      carOwnerRegisterData: { ...carOwnerRegisterDataForm.value },
      uploadedFiles: [...this.uploadedFiles],
    };

    await this.createRequest(request);
    this.loading.send = false;
  }

  onRemoveUploadFileClick(uploadedFile): void {
    const index = this.uploadedFiles.indexOf(uploadedFile);
    if (index > -1) {
      this.uploadedFiles.splice(index, 1);
    }
  }

  openFileTab(url: string) {
    window.open(url, "_blank");
  }

  async fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append("file", file, file.name);

      console.log("file", file, "file.name", file.name);

      try {
        this.uploading = true;
        this.error = "";
        const response = await this.apiService.uploadFile(formData);
        console.log("response:", response);
        this.uploadedFiles.push(new UploadedFile(response, file.name));
      } catch (err) {
        console.error(err);
        this.error = err.statusText ? err.statusText : err.message;
      } finally {
        this.uploading = false;
      }
    }
  }
}
