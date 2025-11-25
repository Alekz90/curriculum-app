import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileRequest, ProfileResponse } from '@interfaces/profile.interface';
import { Result } from '@interfaces/result.interface';
import { Constants } from '@utils/constants';
import { environment } from '@env/environment.development';
import { AddressEmpty, AddressRequest, AddressResponse } from '@app/interfaces/address.interface';
import { Utils } from '@app/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  private readonly PROFILES_URL = `${environment.baseUrl}${environment.profilesPath}`;
  private readonly IMAGES_URL = `${environment.baseUrl}${environment.imagesPath}`;
  private readonly ADDRESS_URL = `${environment.baseUrl}${environment.addressPath}`;

  private httpClient = inject(HttpClient);
  private snackBar   = inject(MatSnackBar);

  profileCache: Result<ProfileResponse> | null = null;

  // Get profile by userId
  getProfileByUserId(userId: string): Observable<Result<ProfileResponse>> {
    if (this.profileCache && this.profileCache.result && this.profileCache.result.userId === userId) {
      return of(this.profileCache);
    }
    return this.httpClient.get<Result<ProfileResponse>>(`${this.PROFILES_URL}/users/${userId}`)
      .pipe(
        tap(result => this.setProfileCache(result)),
        catchError((response) => this.handleError('Get Profile', response.error)),
      );
  }

  // Save or update profile
  saveProfile(userId: string, id: string, profile: ProfileRequest): Observable<Result<ProfileResponse>> {
    const operation = id === Constants.PATH_NEW ? 'Create Profile' : 'Update Profile';
    if (id === Constants.PATH_NEW) {
      return this.httpClient.post<Result<ProfileResponse>>(`${this.PROFILES_URL}/users/${userId}`, profile)
        .pipe(
          tap(() => this.cleanProfileCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    } else {
      return this.httpClient.put<Result<ProfileResponse>>(`${this.PROFILES_URL}/${id}`, profile)
        .pipe(
          tap(() => this.cleanProfileCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    }
  }

  // Save or update address
  saveAddress(profileId: string, id: string, address: AddressRequest): Observable<Result<AddressResponse>> {
    const operation = id === Constants.PATH_NEW ? 'Create Address' : 'Update Address';
    if (id === Constants.PATH_NEW) {
      return this.httpClient.post<Result<AddressResponse>>(`${this.ADDRESS_URL}/profiles/${profileId}`, address)
        .pipe(
          tap(() => this.cleanProfileCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    } else {
      return this.httpClient.put<Result<AddressResponse>>(`${this.ADDRESS_URL}/${id}/profiles/${profileId}`, address)
        .pipe(
          tap(() => this.cleanProfileCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    }
  }

  private handleError(operation: string, result: any): Observable<any> {
    const message = `${operation} failed: ${result.message}`;
    console.error(message);
    this.showMessageError(message);
    return of(result);
  }

  private showMessageError(message: string): void {
    this.snackBar.open(message, 'Cerrar');
  }
  
  private setProfileCache(response: Result<ProfileResponse>): void {
    this.profileCache = response;
  }
  
  private cleanProfileCache(): void {
    this.profileCache = null;
  }
}
