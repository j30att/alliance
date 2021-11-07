import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service'
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit, OnDestroy {
  login: string = 'Gladyce7@hotmail.com'
  password: string = 'Generic'
  loading = false
  error: string = ''

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  async onLoginClick() {
    try {
      this.loading = true
      this.error = ''
      const response = await this.apiService.login(this.login, this.password)
      this.userService.setUser(User.fromJSON(response))
      this.router.navigate(['/']);
    }
    catch (err) {
      console.error(err)
      this.error = err.statusText ? err.statusText : err.message
    }
    finally {
      this.loading = false
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// TODO: пример работы с интервалом
// timerId = null
// this.timerId = setInterval(() => {
//   console.log('setInterval')
// }, 1000)

// setTimeout(() => {
//   clearInterval(this.timerId);
//   console.log('interval stop')
// }, 5000);
