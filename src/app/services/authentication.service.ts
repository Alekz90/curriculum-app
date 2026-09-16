import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Result } from '@app/interfaces/result.interface';
import { Authentication, LoginRequest, RecoveryPasswordRequest, RegisterRequest, User } from '@app/interfaces/user.interface';
import { Constants } from '@app/utils/constants';
import { AuthenticationStatusEnum, RoleEnum } from '@app/utils/enum';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  httpClient = inject(HttpClient);

  private readonly AUTHENTICATION_URL = `${environment.baseUrl}${environment.authenticationsPath}`;
  private readonly VERIFICATION_URL = `${environment.baseUrl}${environment.verificationsPath}`;
  private readonly SENDING_RECOVERY_URL = `${environment.baseUrl}${environment.recoveriesPath}`;

  private snackBar = inject(MatSnackBar);

  private _authenticationStatus = signal<AuthenticationStatusEnum>(AuthenticationStatusEnum.CHECKING);
  private _user  = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  isAdmin = computed(() => RoleEnum.ADMIN === this._user()?.role);
  user    = computed(() => this._user());
  userId  = computed(() => this._user()?.id || '');
  token   = computed(() => this._token());

  authenticationStatus = computed<AuthenticationStatusEnum>(() => {
    if (this._user() && this._token()) {
      return AuthenticationStatusEnum.AUTHENTICATED;
    }

    if (this._authenticationStatus() === AuthenticationStatusEnum.CHECKING) {
      return AuthenticationStatusEnum.CHECKING;
    }

    return AuthenticationStatusEnum.NOT_AUTHENTICATED;
  });

  checkStatusResource = rxResource({
    stream: () => this.checkStatus()
  })

  checkStatus(): Observable<boolean> {
    if (this.authenticationStatus() === AuthenticationStatusEnum.AUTHENTICATED) {
      return of(true);
    }

    const token: string = localStorage.getItem("token") ?? '';
    if (!token) {
      this.logout();
      return of(false);
    }

    //const headers = { Authorization: `Bearer ${token}` };
    //return this.httpClient.get<Result<Authentication>>(`${this.AUTHENTICATION_URL}/check-status`, { headers })
    return this.httpClient.get<Result<Authentication>>(`${this.AUTHENTICATION_URL}/check-status`)
      .pipe(
        map((response) => this.isAuthSuccess(response)),
        catchError((response) => this.isAuthError(response.error)),
    );
  }

  login(request: LoginRequest) : Observable<Result<Authentication>> {
    console.log('Login request:', `${this.AUTHENTICATION_URL}/login`);
    return this.httpClient.post<Result<Authentication>>(`${this.AUTHENTICATION_URL}/login`, request)
      .pipe(
        map((response)  => this.handleAuthSuccess(response)),
        catchError((response) => this.handleAuthError(response)),
    );
  }

  register(request: RegisterRequest): Observable<Result<Authentication>> {
    return this.httpClient.post<Result<Authentication>>(`${this.AUTHENTICATION_URL}/register`, request)
      .pipe(
        map((response) => this.handleAuthSuccess(response)),
        catchError((response) => this.handleAuthError(response)),
    );
  }

  verifyAccount(id: string, code: string): Observable<Result<boolean>> {
    return this.httpClient.get<Result<boolean>>(`${this.VERIFICATION_URL}/${id}/verify/${code}`);
  }

  sendingPasswordRecoveryEmail(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    return this.httpClient.get(`${this.SENDING_RECOVERY_URL}/send-recovery-password`, { params })
      .pipe(
        map(() => true),
        catchError((response) => this.handleErrorBoolean('Sending Password Recovery Email', response.error)),
    );
  }

  recoveryPassword(id: string, request: RecoveryPasswordRequest): Observable<boolean> {
    return this.httpClient.patch(`${this.SENDING_RECOVERY_URL}/${id}/recovery-password`, request)
      .pipe(
        map(() => true),
        catchError((response) => this.handleErrorBoolean('Reset Password', response.error)),
    );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    localStorage.removeItem(Constants.TOKEN);
  }
  
  private handleAuthSuccess(authentication: Result<Authentication>) : Result<Authentication> {
    if (authentication.id !== Constants.ID_SUCCESS) {
      this.logout();
      return authentication;
    }

    const { token, user } = authentication.result!;
    
    this._user.set(user);
    this._token.set(token);
    localStorage.setItem(Constants.TOKEN, token);
    return authentication;
  }
  
  private handleAuthError(response: any): Observable<Result<Authentication>> {
    this.logout();
    return of({
      id: Constants.ID_ERROR,
      message: response.error.message || 'Error de autenticación',
    });
  }
  
  
  private isAuthSuccess(authentication: Result<Authentication>) : boolean {
    this.handleAuthSuccess(authentication);
    return authentication.id === Constants.ID_SUCCESS;
  }
  
  private isAuthError(response: any): Observable<boolean> {
    this.logout();
    return of(false);
  }

  handleErrorBoolean(operation: string, result: any): Observable<boolean> {
    const message = `${operation} failed: ${result.message}`;
    console.error(message);
    this.showMessageError(message);
    return of(false);
  }

  private showMessageError(message: string): void {
    this.snackBar.open(message, 'Cerrar');
  }
}
