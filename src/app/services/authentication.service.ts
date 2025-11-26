import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Result } from '@app/interfaces/result.interface';
import { Authentication, LoginRequest, RegisterRequest, User } from '@app/interfaces/user.interface';
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
  private readonly PUBLIC_URL = this.AUTHENTICATION_URL + '/public';

  private _authenticationStatus = signal<AuthenticationStatusEnum>(AuthenticationStatusEnum.CHECKING);
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  isAdmin = computed(() => RoleEnum.ADMIN === this._user()?.role);
  user = computed(() => this._user());
  userId = computed(() => this._user()?.id || '');
  token = computed(() => this._token());

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
    return this.httpClient.post<Result<Authentication>>(`${this.PUBLIC_URL}/login`, request)
      .pipe(
        map((response)  => this.handleAuthSuccess(response)),
        catchError((response) => this.handleAuthError(response)),
    );
  }

  register(request: RegisterRequest): Observable<Result<Authentication>> {
    return this.httpClient.post<Result<Authentication>>(`${this.PUBLIC_URL}/register`, request)
      .pipe(
        map((response) => this.handleAuthSuccess(response)),
        catchError((response) => this.handleAuthError(response)),
    );
  }

  verifyAccount(id: string, code: string): Observable<Result<boolean>> {
    return this.httpClient.get<Result<boolean>>(`${this.VERIFICATION_URL}/${id}/verify/${code}`);
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
}
