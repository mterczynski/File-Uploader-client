import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from './cookie.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

enum AuthEvent {
  logIn,
  logOut
}

@Injectable()
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private _eventSubject = new Subject<AuthEvent>();

  public get eventSubject(){
    return this._eventSubject;
  }

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  saveToken(token) {
    this.cookieService.setCookie('token', token, 5);
    this.eventSubject.next(AuthEvent.logIn);
  }

  logIn({usernameOrEmail, password}) {
    const res = this.http.post(environment.apiUrl + '/login', {
      usernameOrEmail,
      password
    });

    return res as Observable<any>;
  }

  logOut() {
    this.cookieService.removeCookie('token');
    this.router.navigate(['/']);
    this.eventSubject.next(AuthEvent.logOut);
  }

  getToken() {
    return this.cookieService.getCookie('token');
  }

  getUser() {
    if (this.getToken()) {
      return this.jwtHelper.decodeToken(this.getToken());
    }
    return null;
  }

  register({username, password, email}) {

    const res = this.http.post(environment.apiUrl + '/register', {
      username,
      email,
      password
    });

    return res as Observable<any>;
  }

}
