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
  selector: "app-tachograph-estr-driver-card",
  templateUrl: "./tachograph-estr-driver-card.component.html",
  styleUrls: ["./tachograph-estr-driver-card.component.scss"],
})
export class TachographEstrDriverCardComponent
  extends RequestBase
  implements OnInit
{
  uploading = false;
  requestBody: any = {};
  personalData: any = {};
  passport: any = {};
  personalDocuments: any = {};
  driverLicense: any = {};
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
    this.driverLicense = this.requestBody.driverLicense;
    this.personalDocuments = this.requestBody.personalDocuments;
    this.uploadedFiles = _.clone(this.requestBody.uploadedFiles);

    if (!this.personalData) {
      this.personalData = {};
    }

    if (!this.passport) {
      this.passport = {};
    }

    if (!this.driverLicense) {
      this.driverLicense = {};
    }

    if (!this.personalDocuments) {
      this.personalDocuments = {};
    }

    this.personalData.dateOfBirth = !_.isEmpty(this.personalData.dateOfBirth)
      ? new Date(this.personalData.dateOfBirth)
      : "";
    this.passport.dateOfIssue = !_.isEmpty(this.passport.dateOfIssue)
      ? new Date(this.passport.dateOfIssue)
      : "";
    this.driverLicense.dateOfIssue = !_.isEmpty(this.driverLicense.dateOfIssue)
      ? new Date(this.driverLicense.dateOfIssue)
      : "";
    this.driverLicense.dateOfExpire = !_.isEmpty(
      this.driverLicense.dateOfExpire
    )
      ? new Date(this.driverLicense.dateOfExpire)
      : "";
  }

  async fillFormsFieldsFromUser(user: User): Promise<void> {
    this.personalData.phone = user.phone;
    this.personalData.organization = user.organization;
    this.personalData.firstName = user.firstName;
    this.personalData.lastName = user.lastName;
    this.personalData.patronymic = user.patronymic;
    this.personalData.email = user.email;
  }

  async onCreateButton(
    personalDataForm: NgForm,
    passportForm: NgForm,
    personalDocumentsForm: NgForm,
    driverLicenseForm: NgForm
  ) {
    this.loading.send = true;
    this.error = "";
    let request = new Request();
    request.status = RequestStatus.STATUS_NEW;
    request.type = RequestType.TYPE_ESTR_DRIVER_CARD;
    request.category = RequestCategory.CATEGORY_TACHOGRAPH;
    request.body = {
      personalData: { ...personalDataForm.value },
      passport: { ...passportForm.value },
      personalDocuments: { ...personalDocumentsForm.value },
      driverLicense: { ...driverLicenseForm.value },
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
