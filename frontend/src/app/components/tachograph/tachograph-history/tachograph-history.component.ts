import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { Request, RequestCategory, RequestHighlight, RequestStatus, RequestType } from 'src/app/models/request';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'lodash';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-tachograph-history',
  templateUrl: './tachograph-history.component.html',
  styleUrls: ['./tachograph-history.component.scss']
})
export class TachographHistoryComponent implements OnInit {
  loading = false
  error: string = ''
  user: User;
  userStreamSubscription: Subscription;
  carOwnerTypeDefault = 'Entity'
  requestStatus: string
  RequestHighlight = RequestHighlight;
  requests: Request[] = []

  filterForm = new FormGroup({
    number: new FormControl(''),
    date: new FormControl(''),
    status: new FormControl(''),
  })

  constructor(
    private apiService: ApiService,
    private router: Router,
    private userService: UserService,
    private requestService: RequestService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.userStreamSubscription = this.userService.getUserStream().subscribe((user: User) => {
      this.user = _.clone(user)
    });

    await this.getRequets()
  }

  ngOnDestroy(): void {
    this.userStreamSubscription.unsubscribe();
  }

  async getRequets() {
    try {
      this.loading = true
      this.error = ''
      let queryObject = this.generateSearchQuery()
      const query = `?s=${queryObject}`

      console.log('this.filterForm',  this.filterForm)

      const response = await this.apiService.getRequests(query)
      this.requests = response
        .map(request => Request.fromJSON(request))
      this.requests = _.orderBy(_.clone(this.requests), 'created_at', 'desc')
    }
    catch (err) {
      console.error(err)
      this.error = err.statusText ? err.statusText : err.message
    }
    finally {
      this.loading = false
    }
  }

  async onRowClick(request: Request) {
    this.requestService.goToRequest(request.category, request.type, request.id)
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  generateSearchQuery(): string{
    const category = this.getCategoryFromUrl()
    let arrayFilter = [];

    arrayFilter.push({"category":category});
    if (
      this.filterForm.value.status != "" &&
      this.filterForm.value.status != null
    ){
      arrayFilter.push({"status":this.filterForm.value.status});
    }
    if (
      this.filterForm.value.number != "" &&
      this.filterForm.value.status != null
    ){
      arrayFilter.push({"id":this.filterForm.value.number});
    }
    if (
      this.filterForm.value.date != "" &&
      this.filterForm.value.date != null
    ){
      arrayFilter.push(
        {"created_at":
            {"$between":[
                new Date(this.filterForm.value.date.start),
                new Date(this.filterForm.value.date.end)
              ]
            }
        });
    }

    arrayFilter = arrayFilter.filter(item => Object.values(item)[0] != null)
    const arrayFilterString = JSON.stringify(arrayFilter)
    return `{"$and":${arrayFilterString}}`
  }

  getCategoryFromUrl(): string{
    const url = this.router.url

    return url.slice(1, url.length).split('/')[0]
  }

}
