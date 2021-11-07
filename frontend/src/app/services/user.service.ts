import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userStrean: BehaviorSubject<User> = new BehaviorSubject(null)

  constructor(
    private storageService: StorageService,
    private router: Router,) {
    this.init();
  }

  init() {
    const user = this.storageService.get('user')
    this.userStrean.next(User.fromJSON(user))
  }

  getUserStream() {
    return this.userStrean
  }

  setUser(user: User) {
    this.storageService.set('user', user)
    this.userStrean.next(user)
  }

  logout(): void {
    this.setUser(Object.assign(new User(), {}))
    this.router.navigate(['sign-in']);
  }
}
