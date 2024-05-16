import { Injectable } from '@angular/core';
import { SignupRequest} from './authRequest'
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBase: string = 'http://127.0.0.1:8000/api/auth/';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private isStaff = new BehaviorSubject<boolean>(this.checkIfStaff());

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {}

  showSuccess(message = "") {
    this.toastr.success(message, "",{
      progressBar: true,
      timeOut: 3000
    })
  }

  showError(message = "") {
    this.toastr.error(message, "",{
      progressBar: true,
      timeOut: 3000
    })
  }

  login(credentials: any): Observable<any> {
    return this.http.post(this.urlBase + "login/", credentials).pipe(
      tap((data: any) => {
        localStorage.setItem('token', data.access);
        localStorage.setItem('is_staff', data.user.is_staff.toString());
        this.updateLoginStatus(true);
      })
    );
  }

  signup(credentials: SignupRequest): Observable<any> {
    return this.http.post(this.urlBase + "signup/", credentials);
  }

  logOut(): void {
    
    this.http.post(this.urlBase + "logout/", {}).subscribe({
      next: () => {
        localStorage.clear()

        this.showSuccess("¡Esperamos verte pronto!");
        localStorage.removeItem('is_staff');
        this.updateLoginStatus(false);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
        this.showError('Error al cerrar sesión. Inténtalo de nuevo.');
      }
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isUserStaff(): Observable<boolean> {
    return this.isStaff.asObservable();
  }

  private hasToken(): boolean {
    const tokenExists = !!localStorage.getItem('token');
    console.log('hasToken:', tokenExists);
    return tokenExists;
  }

  private checkIfStaff(): boolean {
    const isStaff = localStorage.getItem('is_staff') === 'true';
    console.log('checkIfStaff:', isStaff);
    return isStaff;
  }


  updateLoginStatus(status: boolean): void {
    console.log('updateLoginStatus:', status);
    this.loggedIn.next(status);
    this.isStaff.next(this.checkIfStaff());
  }

  public initializeAuthentication(): void {
    const tokenExists = this.hasToken();
    console.log('initializeAuthentication - tokenExists:', tokenExists);
    this.updateLoginStatus(tokenExists);
  }

}