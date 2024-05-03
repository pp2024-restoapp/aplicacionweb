import { Injectable } from '@angular/core';
import { LoginRequest } from './authRequest';
import { SignupRequest} from './authRequest'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBase: string = 'http://127.0.0.1:8000/api/auth/';
  
  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post(this.urlBase + "login/", credentials);
  }

  signup(credentials: SignupRequest): Observable<any> {
    return this.http.post(this.urlBase + "signup/", credentials);
  }

}