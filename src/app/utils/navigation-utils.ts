import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsRoutes } from '@utils/route-constants';

@Injectable({
  providedIn: 'root'
})
export class NavigationUtils {

  private router = inject(Router);
  
  goToLogin() {
    this.router.navigate([ConstantsRoutes.login.pathLink]);
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

  goToFormSummary(idSummary: string): void {
    this.router.navigate([ConstantsRoutes.summaryForm.pathLink, idSummary]);
  }

  goToEditLink(): void {
    this.router.navigate([ConstantsRoutes.links.pathLink]);
  }

  goToFormLink(idLink: string): void {
    this.router.navigate([ConstantsRoutes.linkForm.pathLink, idLink]);
  }

  goToEditLanguage(): void {
    this.router.navigate([ConstantsRoutes.languages.pathLink]);
  }

  goToFormLanguage(idLanguage: string): void {
    this.router.navigate([ConstantsRoutes.languageForm.pathLink, idLanguage]);
  }

  goToEditExperience(): void {
    this.router.navigate([ConstantsRoutes.experiences.pathLink]);
  }

  goToFormExperience(idExperience: string): void {
    this.router.navigate([ConstantsRoutes.experienceForm.pathLink, idExperience]);
  }

  goToEditCertification(): void {
    this.router.navigate([ConstantsRoutes.certifications.pathLink]);
  }

  goToFormCertification(idCertification: string): void {
    this.router.navigate([ConstantsRoutes.certificationForm.pathLink, idCertification]);
  }

  goToEditEducation(): void {
    this.router.navigate([ConstantsRoutes.educations.pathLink]);
  }

  goToFormEducation(idEducation: string): void {
    this.router.navigate([ConstantsRoutes.educationForm.pathLink, idEducation]);
  }

  goToEditAbility(): void {
    this.router.navigate([ConstantsRoutes.abilities.pathLink]);
  }

  goToFormAbility(idAbility: string): void {
    this.router.navigate([ConstantsRoutes.abilityForm.pathLink, idAbility]);
  }
}