import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { Notification } from 'src/app/models/notification';
import { Request } from 'src/app/models/request';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiHost: string = environment.apiHost;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
  }

  login(username: string, password: string): Promise<User> {
    return this.http.post<any>(`${this.apiHost}/auth/login`, {
      username: username,
      password: password
    }).toPromise();
  }

  users(): Promise<User> {
    return this.http.get<any>(`${this.apiHost}/users`, { withCredentials: true }).toPromise();
  }

  updateUser(user: User): Promise<User> {
    return this.http.patch<any>(`${this.apiHost}/users/${user.id}`, user, { withCredentials: true }).toPromise();
  }

  notifications(): Promise<Notification []> {
    return this.http.get<any>(`${this.apiHost}/notification`, { withCredentials: true }).toPromise();
  }

  notificationReset(id): Promise<Notification[]> {
    let notification = {
      id: id,
      requestCategory: null,
      requestType: null,
      requestNumber: null
    }
    return this.http.patch<any>(`${this.apiHost}/notification/${notification.id}`, notification, { withCredentials: true }).toPromise();
  }

  updateNotification(notification: Notification): Promise<Notification> {
    return this.http.patch<any>(`${this.apiHost}/notification/${notification.id}`, notification, { withCredentials: true }).toPromise();
  }

  // TODO: заглушка для генерации id заявок
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  createRequest(request: Request): Promise<Request> {
    // TODO: заглушка для генерации общей части заявок
    request.created_at = new Date().toISOString()
    request.id = request.id > 0 ? request.id : this.getRandomInt(999999)
    request.contractor = `ООО ${this.userService.getUserStream().getValue().organization}`
    if ('carModel' in request.body) {
      request.vehicle = request.body['carModel']
    }
    //

    return this.http.post<any>(`${this.apiHost}/request`, request, { withCredentials: true }).toPromise();
  }

  updateRequest(request: Request): Promise<Request> {
    return this.http.patch<any>(`${this.apiHost}/request/${request.id}`, request, { withCredentials: true }).toPromise();
  }

  getRequests(filter = ''): Promise<Request []> {
    return this.http.get<any>(`${this.apiHost}/request${filter}`, { withCredentials: true }).toPromise();
  }

  getRequest(id: any): Promise<Request> {
    return this.http.get<any>(`${this.apiHost}/request/${id}`, { withCredentials: true }).toPromise();
  }

  uploadFile(formData: FormData): Promise<any> {
    let headers =  new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json'
    })

    return this.http.post<string>(`${this.apiHost}/upload`, formData, { withCredentials: true,  headers: headers, responseType: 'text' as 'json'}).toPromise();
  }

}
