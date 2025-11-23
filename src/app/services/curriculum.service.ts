import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileResponse } from '@interfaces/profile.interface';
import { Result } from '@interfaces/result.interface';
import { SummaryRequest, SummaryResponse } from '@interfaces/summary.interface';
import { User } from '@interfaces/user.interface';
import { AbilityGroupRequest, AbilityGroupResponse, AbilityResponse } from '@interfaces/ability.interface';
import { AddressResponse } from '@interfaces/address.interface';
import { CertificationRequest, CertificationResponse } from '@interfaces/certification.interface';
import { EducationRequest, EducationResponse } from '@interfaces/education.interface';
import { ExperienceRequest, ExperienceResponse } from '@interfaces/experience.interface';
import { LanguageRequest, LanguageResponse } from '@interfaces/language.interface';
import { LinkRequest, LinkResponse } from '@interfaces/link.interface';
import { ProfessionalDetailResponse } from '@interfaces/professional-detail.interface';
import { Constants } from '@utils/constants';
import { environment } from '@env/environment.development';
import { EducationLevelEnum, LanguageLevelEnum, RoleEnum } from '@utils/enum';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  profile: ProfileResponse = {
    id: 'idProfile',
    userId: 'userIdProfile',
    birthDate: new Date('1995-06-15'),
    codePhone: '+52',
    cellphone: '8112345678',
    image: 'https://example.com/images/alejandro-del-angel.jpg',
    fullName: 'Alejandro Del Ángel',
  };

  user: User = {
    id: 'userId',
    email: 'alejandro.delangel@example.com',
    username: 'adelangel',
    role: RoleEnum.USER,
    active: true,
    blocked: false,
    verified: true
  };

  private readonly PROFESSIONAL_DETAIL_URL = `${environment.baseUrl}${environment.professionalDetailsPath}`;
  private readonly LINKS_URL = `${environment.baseUrl}${environment.linksPath}`;
  private readonly LANGUAGES_URL = `${environment.baseUrl}${environment.languagesPath}`;
  private readonly EXPERIENCES_URL = `${environment.baseUrl}${environment.experiencesPath}`;
  private readonly ABILITIES_URL = `${environment.baseUrl}${environment.abilitiesPath}`;
  private readonly CERTIFICATIONS_URL = `${environment.baseUrl}${environment.certificationsPath}`;
  private readonly EDUCATIONS_URL = `${environment.baseUrl}${environment.educationsPath}`;
  private readonly SUMMARIES_URL = `${environment.baseUrl}${environment.summariesPath}`;

  private httpClient = inject(HttpClient);
  private snackBar   = inject(MatSnackBar);

  detailsCache: Result<ProfessionalDetailResponse> | null = null;

  // Get professional detail by userId with caching
  getProfessionalDetailByUserId(userId: string): Observable<Result<ProfessionalDetailResponse>> {
    if (this.detailsCache && this.detailsCache.result && this.detailsCache.result.userId === userId) {
      return of(this.detailsCache);
    }

    return this.httpClient.get<Result<ProfessionalDetailResponse>>(`${this.PROFESSIONAL_DETAIL_URL}/users/${userId}`)
      .pipe(
        tap(details => this.setDetailsCache(details)),
        catchError((response) => this.handleError('Get Professional Detail', response.error)),
      );
  }

  // Save or update summary
  saveSummary(detailId: string, id: string, summary: SummaryRequest): Observable<Result<SummaryResponse>> {
    const operation = id === Constants.PATH_NEW ? 'Create Summary' : 'Update Summary';
    if (id === Constants.PATH_NEW) {
      return this.httpClient.post<Result<SummaryResponse>>(`${this.SUMMARIES_URL}/profesional-details/${detailId}`, summary)
        .pipe(
          tap(() => this.cleanDetailsCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    } else {
      return this.httpClient.put<Result<SummaryResponse>>(`${this.SUMMARIES_URL}/${id}/profesional-details/${detailId}`, summary)
        .pipe(
          tap(() => this.cleanDetailsCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    }
  }

  // Save or update link
  saveLink(detailId: string, id: string, link: LinkRequest): Observable<Result<LinkResponse>> {
    const operation = id === Constants.PATH_NEW ? 'Create Link' : 'Update Link';
    if (id === Constants.PATH_NEW) {
      return this.httpClient.post<Result<LinkResponse>>(`${this.LINKS_URL}/profesional-details/${detailId}`, link)
        .pipe(
          tap(() => this.cleanDetailsCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    } else {
      return this.httpClient.put<Result<LinkResponse>>(`${this.LINKS_URL}/${id}/profesional-details/${detailId}`, link)
        .pipe(
          tap(() => this.cleanDetailsCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    }
  }

  // Delete link
  deleteLink(detailId: string, id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.LINKS_URL}/${id}/profesional-details/${detailId}`)
      .pipe(
        map(() => this.cleanDeleteDetailsCache()),
        catchError((response) => this.handleDeleteError('Delete Link', response.error))
      );
  }

  // Save or update language
  saveLanguage(detailId: string, id: string, language: LanguageRequest): Observable<Result<LanguageResponse>> {
    const operation = id === Constants.PATH_NEW ? 'Create Language' : 'Update Language';
    if (id === Constants.PATH_NEW) {
      return this.httpClient.post<Result<LanguageResponse>>(`${this.LANGUAGES_URL}/profesional-details/${detailId}`, language)
        .pipe(
          tap(() => this.cleanDetailsCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    } else {
      return this.httpClient.put<Result<LanguageResponse>>(`${this.LANGUAGES_URL}/${id}/profesional-details/${detailId}`, language)
        .pipe(
          tap(() => this.cleanDetailsCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    }
  }

  // Delete language
  deleteLanguage(detailId: string, id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.LANGUAGES_URL}/${id}/profesional-details/${detailId}`)
      .pipe(
        map(() => this.cleanDeleteDetailsCache()),
        catchError((response) => this.handleDeleteError('Delete Language', response.error))
      );
  }

  // Save or update experience
  saveExperience(detailId: string, id: string, experience: ExperienceRequest): Observable<Result<ExperienceResponse>> {
    const operation = id === Constants.PATH_NEW ? 'Create Experience' : 'Update Experience';
    if (id === Constants.PATH_NEW) {
      return this.httpClient.post<Result<ExperienceResponse>>(`${this.EXPERIENCES_URL}/profesional-details/${detailId}`, experience)
        .pipe(
          tap(() => this.cleanDetailsCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    } else {
      return this.httpClient.put<Result<ExperienceResponse>>(`${this.EXPERIENCES_URL}/${id}/profesional-details/${detailId}`, experience)
        .pipe(
          tap(() => this.cleanDetailsCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    }
  }

  // Delete experience
  deleteExperience(detailId: string, id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.EXPERIENCES_URL}/${id}/profesional-details/${detailId}`)
      .pipe(
        map(() => this.cleanDeleteDetailsCache()),
        catchError((response) => this.handleDeleteError('Delete Experience', response.error))
      );
  }

  // Save or update certification
  saveCertification(detailId: string, id: string, certification: CertificationRequest): Observable<Result<CertificationResponse>> {
    const operation = id === Constants.PATH_NEW ? 'Create Certification' : 'Update Certification';
    if (id === Constants.PATH_NEW) {
      return this.httpClient.post<Result<CertificationResponse>>(`${this.CERTIFICATIONS_URL}/profesional-details/${detailId}`, certification)
        .pipe(
          tap(() => this.cleanDetailsCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    } else {
      return this.httpClient.put<Result<CertificationResponse>>(`${this.CERTIFICATIONS_URL}/${id}/profesional-details/${detailId}`, certification)
        .pipe(
          tap(() => this.cleanDetailsCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    }
  }

  // Delete certification
  deleteCertification(detailId: string, id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.CERTIFICATIONS_URL}/${id}/profesional-details/${detailId}`)
      .pipe(
        map(() => this.cleanDeleteDetailsCache()),
        catchError((response) => this.handleDeleteError('Delete Certification', response.error))
      );
  }

  // Save or update education
  saveEducation(detailId: string, id: string, education: EducationRequest): Observable<Result<EducationResponse>> {
    const operation = id === Constants.PATH_NEW ? 'Create Education' : 'Update Education';
    if (id === Constants.PATH_NEW) {
      return this.httpClient.post<Result<EducationResponse>>(`${this.EDUCATIONS_URL}/profesional-details/${detailId}`, education)
        .pipe(
          tap(() => this.cleanDetailsCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    } else {
      return this.httpClient.put<Result<EducationResponse>>(`${this.EDUCATIONS_URL}/${id}/profesional-details/${detailId}`, education)
        .pipe(
          tap(() => this.cleanDetailsCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    }
  }

  // Delete education
  deleteEducation(detailId: string, id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.EDUCATIONS_URL}/${id}/profesional-details/${detailId}`)
      .pipe(
        map(() => this.cleanDeleteDetailsCache()),
        catchError((response) => this.handleDeleteError('Delete Education', response.error))
      );
  }

  // Save or update ability group
  saveAbilityGroup(detailId: string, id: string, abilityGroup: AbilityGroupRequest): Observable<Result<AbilityGroupResponse>> {
    const operation = id === Constants.PATH_NEW ? 'Create Ability Group' : 'Update Ability Group';
    if (id === Constants.PATH_NEW) {
      return this.httpClient.post<Result<AbilityGroupResponse>>(`${this.ABILITIES_URL}/profesional-details/${detailId}`, abilityGroup)
        .pipe(
          tap(() => this.cleanDetailsCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    } else {
      return this.httpClient.put<Result<AbilityGroupResponse>>(`${this.ABILITIES_URL}/${id}/profesional-details/${detailId}`, abilityGroup)
        .pipe(
          tap(() => this.cleanDetailsCache()),
          catchError((response) => this.handleError(operation, response.error)),
        );
    }
  }

  // Delete ability group
  deleteAbilityGroup(detailId: string, id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.ABILITIES_URL}/${id}/profesional-details/${detailId}`)
      .pipe(
        map(() => this.cleanDeleteDetailsCache()),
        catchError((response) => this.handleDeleteError('Delete Ability Group', response.error))
      );
  }

  private setDetailsCache(details: Result<ProfessionalDetailResponse>): void {
    this.detailsCache = details;
  }

  private cleanDetailsCache(): void {
    this.detailsCache = null;
  }

  private handleError(operation: string, result: any): Observable<any> {
    const message = `${operation} failed: ${result.message}`;
    console.error(message);
    this.showMessageError(message);
    return of(result);
  }

  private cleanDeleteDetailsCache(): boolean {
    this.cleanDetailsCache();
    return true;
  }

  private handleDeleteError(operation: string, result: any): Observable<boolean> {
    const message = `${operation} failed: ${result.message}`;
    console.error(message);
    this.showMessageError(message);
    return of(false);
  }

  private showMessageError(message: string): void {
    this.snackBar.open(message, 'Cerrar');
  }
}
