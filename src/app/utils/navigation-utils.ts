import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsRoutes } from '@utils/route-constants';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class NavigationUtils {

  private router = inject(Router);
  private activatedRoute    = inject(ActivatedRoute);

  includesUrl(urlFragment: string): boolean {
    return this.router.url.includes(urlFragment);
  }

  getRouteParam(paramName: string): string {
    return this.activatedRoute.snapshot.paramMap.get(paramName) || '';
  }
  
  goToLogin() {
    this.router.navigate([ConstantsRoutes.login.pathLink]);
  }

  goToProfile(): void {
    this.router.navigate([ConstantsRoutes.profile.pathLink]);
  }

  goToFormImage(imageId: string): void {
    this.router.navigate([ConstantsRoutes.imageForm.pathLink, this.getValidateId(imageId)]);
  }

  goToFormPassword(userId: string): void {
    this.router.navigate([ConstantsRoutes.passwordForm.pathLink, this.getValidateId(userId)]);
  }

  goToFormAddress(addressId: string): void {
    this.router.navigate([ConstantsRoutes.addressForm.pathLink, this.getValidateId(addressId)]);
  }

  goToFormProfile(profileId: string): void {
    this.router.navigate([ConstantsRoutes.profileForm.pathLink, this.getValidateId(profileId)]);
  }

  goToHome() {
    this.router.navigate([ConstantsRoutes.home.pathLink]);
  }

  goToSendingRecovery() {
    this.router.navigate([ConstantsRoutes.sendingRecovery.pathLink]);
  }

  goToRegister() {
    this.router.navigate([ConstantsRoutes.register.pathLink]);
  }
  
  goToVerificationInfo(email: String): void {
    this.router.navigate([ConstantsRoutes.verificationInfo.pathLink], {
      state: {
        email: email,
      }
    });
  }

  goToEditSummary(): void {
    this.router.navigate([ConstantsRoutes.summaries.pathLink]);
  }

  goToFormSummary(idSummary: string = Constants.PATH_NEW): void {
    this.router.navigate([ConstantsRoutes.summaryForm.pathLink, idSummary]);
  }

  goToEditLink(): void {
    this.router.navigate([ConstantsRoutes.links.pathLink]);
  }

  goToFormLink(idLink: string = Constants.PATH_NEW): void {
    this.router.navigate([ConstantsRoutes.linkForm.pathLink, idLink]);
  }

  goToEditLanguage(): void {
    this.router.navigate([ConstantsRoutes.languages.pathLink]);
  }

  goToFormLanguage(idLanguage: string = Constants.PATH_NEW): void {
    this.router.navigate([ConstantsRoutes.languageForm.pathLink, idLanguage]);
  }

  goToEditExperience(): void {
    this.router.navigate([ConstantsRoutes.experiences.pathLink]);
  }

  goToFormExperience(idExperience: string = Constants.PATH_NEW): void {
    this.router.navigate([ConstantsRoutes.experienceForm.pathLink, idExperience]);
  }

  goToEditCertification(): void {
    this.router.navigate([ConstantsRoutes.certifications.pathLink]);
  }

  goToFormCertification(idCertification: string = Constants.PATH_NEW): void {
    this.router.navigate([ConstantsRoutes.certificationForm.pathLink, idCertification]);
  }

  goToEditEducation(): void {
    this.router.navigate([ConstantsRoutes.educations.pathLink]);
  }

  goToFormEducation(idEducation: string = Constants.PATH_NEW): void {
    this.router.navigate([ConstantsRoutes.educationForm.pathLink, idEducation]);
  }

  goToEditAbility(): void {
    this.router.navigate([ConstantsRoutes.abilities.pathLink]);
  }

  goToFormAbility(idAbility: string = Constants.PATH_NEW): void {
    this.router.navigate([ConstantsRoutes.abilityForm.pathLink, idAbility]);
  }

  private getValidateId(id: string): string {
    return id && id.trim() !== '' ? id : Constants.PATH_NEW;
  }
}