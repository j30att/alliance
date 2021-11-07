import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_TOKEN = 'auth_token';

  constructor(private cookieService: CookieService) {
  }

  login(authCookieValue: string) {
    this.cookieService.set(environment.authCookieName, authCookieValue);
  }

  isAuthenticated(): boolean {
    return this.cookieService.check(environment.authCookieName)
  }

  logout() {
    this.cookieService.delete(environment.authCookieName, '/')
  }
}