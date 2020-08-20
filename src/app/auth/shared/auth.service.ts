import {EventEmitter, Injectable, Output} from '@angular/core';
import {SignUpRequestPayload} from '../sign-up/SignUpRequestPayload';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoginRequestPayload} from '../login/loginRequestPayload';
import {LoginResponsePayload} from '../login/loginResponsePayload';
import {LocalStorageService} from 'ngx-webstorage';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  };

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
  }

  signup(signUpRequestPayload: SignUpRequestPayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/signup', signUpRequestPayload, {responseType: 'text'});
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponsePayload>('http://localhost:8080/api/auth/login', loginRequestPayload)
      .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);

        this.loggedIn.emit(true);
        this.username.emit(data.username);
        return true;
      }));
  }

  refreshToken(): any {
    return this.http.post<LoginResponsePayload>('http://localhost:8080/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(respone => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken', respone.authenticationToken);
        this.localStorage.store('expiresAt', respone.expiresAt);
      }));
  }

  getJwtToken(): any {
    return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken(): any {
    return this.localStorage.retrieve('refreshToken');
  }

  getUserName(): any {
    return this.localStorage.retrieve('username');
  }

  getExpirationTime(): any {
    return this.localStorage.retrieve('expiresAt');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  logout(): any {
    this.http.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload, {responseType: 'text'})
      .subscribe(data => {
        console.log(data);
        // tslint:disable-next-line:no-shadowed-variable
      }, error => {
        throwError(error);
      });
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

}
