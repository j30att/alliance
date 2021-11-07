import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { Request, RequestCategory, RequestStatus, RequestType } from 'src/app/models/request';
import { NgForm } from '@angular/forms'
import * as _ from 'lodash';
import { RequestService } from 'src/app/services/request.service';
import { UploadedFile } from 'src/app/models/uploadedFile';
import { RequestBase } from 'src/app/common/base-classes/requestBase';
import { ToastService } from 'src/app/services/toast.service';

export class PreviouslyIssuedCard {
  constructor(
    public number: string = '',
    public validity: string = '',
    public owner: string = '',
  ) { }
}
export class ReceivingCardPerson  {
  constructor(
    public series: string = '',
    public number: string = '',
    public dateOfIssue: string | Date = '',
    public issuer: string = '',
    public departmentCode: string = '',
  ) { }
}

@Component({
  selector: 'app-tachograph-estr-company-card',
  templateUrl: './tachograph-estr-company-card.component.html',
  styleUrls: ['./tachograph-estr-company-card.component.scss']
})
export class TachographEstrCompanyCardComponent extends RequestBase implements OnInit {
  uploading = false
  requestBody: any = {}
  personalData: any = {}
  previouslyIssuedCards: PreviouslyIssuedCard[] = []
  receivingCardPersons: ReceivingCardPerson[] = []
  uploadedFiles: UploadedFile[] = []

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
    this.personalData = this.requestBody.personalData
    this.previouslyIssuedCards = _.clone(this.requestBody.previouslyIssuedCards)
    this.uploadedFiles = _.clone(this.requestBody.uploadedFiles)

    if (!this.personalData) {
      this.personalData = {}
    }

    this.receivingCardPersons =_.clone(this.requestBody.receivingCardPersons).map(receivingCardPerson => {
      return {...receivingCardPerson, dateOfIssue: new Date(receivingCardPerson.dateOfIssue) }
    })
  }

  async fillFormsFieldsFromUser(user: User): Promise<void> {
    this.personalData.phone = user.phone
    this.personalData.position = user.position
    this.personalData.organization = user.organization
    this.personalData.firstName = user.firstName
    this.personalData.lastName = user.lastName
    this.personalData.patronymic = user.patronymic
    this.personalData.email = user.email
  }

  async onCreateButton(
    personalDataForm: NgForm
  ) {

    this.loading.send = true;
    this.error = "";
    let request = new Request()
    request.status = RequestStatus.STATUS_NEW
    request.type = RequestType.TYPE_ESTR_ORGANIZATION_CARD
    request.category = RequestCategory.CATEGORY_TACHOGRAPH
    request.body = {
      personalData: { ...personalDataForm.value },
      previouslyIssuedCards: [ ...this.previouslyIssuedCards ],
      receivingCardPersons: [...this.receivingCardPersons],
      uploadedFiles: [...this.uploadedFiles]
    }

    await this.createRequest(request);
    this.loading.send = false;
  }

  onAddCardClick(): void {
    this.previouslyIssuedCards.push(new PreviouslyIssuedCard())
  }

  onRemoveCardClick(previouslyIssuedCard): void {
    const index = this.previouslyIssuedCards.indexOf(previouslyIssuedCard)
    if (index > -1) {
      this.previouslyIssuedCards.splice(index, 1)
    }
  }

  onAddPersonClick(): void {
    this.receivingCardPersons.push(new ReceivingCardPerson())
  }

  onRemovePersonClick(receivingCardPerson): void {
    const index = this.receivingCardPersons.indexOf(receivingCardPerson)
    if (index > -1) {
      this.receivingCardPersons.splice(index, 1)
    }
  }

  onRemoveUploadFileClick(uploadedFile): void {
    const index = this.uploadedFiles.indexOf(uploadedFile)
    if (index > -1) {
      this.uploadedFiles.splice(index, 1)
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
      formData.append('file', file, file.name);

      console.log('file', file, 'file.name', file.name)

      try {
        this.uploading = true
        this.error = ''
        const response = await this.apiService.uploadFile(formData)
        console.log('response:', response)
        this.uploadedFiles.push(new UploadedFile(response, file.name))

      }
      catch (err) {
        console.error(err)
        this.error = err.statusText ? err.statusText : err.message
      }
      finally {
        this.uploading = false
      }
    }
  }

}
