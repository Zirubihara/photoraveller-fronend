import { Injectable } from '@angular/core';
import { SignUpRequestPayload} from '../sign-up/SignUpRequestPayload';
import { Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import {LoginRequestPayload} from '../login/loginRequestPayload';
import {LoginResponsePayload} from '../login/loginResponsePayload';
import {LocalStorageService} from 'ngx-webstorage';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  signup(signUpRequestPayload: SignUpRequestPayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/signup', signUpRequestPayload);
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponsePayload>('http://localhost:8080/api/auth/login', loginRequestPayload)
      .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        return true;
      }));
  }
}
