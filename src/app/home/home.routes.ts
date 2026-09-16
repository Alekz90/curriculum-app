import { Routes } from "@angular/router";
import { ConstantsRoutes } from "@utils/route-constants";
import { VerificationPageComponent } from "@app/no-auth/pages/verification-page/verification-page.component";
import { DashboardPageComponent } from "@home/pages/dashboard-page/dashboard-page.component";
import { ProfilePageComponent } from "@home/pages/profile-page/profile-page.component";
import { TemplatePageComponent } from "@home/pages/template-page/template-page.component";
import { LinkPageComponent } from "@home/pages/link-page/link-page.component";
import { CertificationPageComponent } from "@home/pages/certification-page/certification-page.component";
import { EducationPageComponent } from "@home/pages/education-page/education-page.component";
import { AbilityPageComponent } from "@home/pages/ability-page/ability-page.component";
import { HomePageComponent } from "@home/pages/home-page/home-page.component";
import { SummaryPageComponent } from "@home/pages/summary-page/summary-page.component";
import { ExperiencePageComponent } from "@home/pages/experience-page/experience-page.component";
import { LanguagePageComponent } from "@home/pages/language-page/language-page.component";

export const HomeRoutes: Routes = [
  {
    path: '', component: HomePageComponent,
    children: [
      {
        path: ConstantsRoutes.profile.path,
        title: ConstantsRoutes.profile.title,
        component: ProfilePageComponent
      },
      {
        path: ConstantsRoutes.profileForm.path,
        title: ConstantsRoutes.profileForm.title,
        component: ProfilePageComponent
      },
      {
        path: ConstantsRoutes.imageForm.path,
        title: ConstantsRoutes.imageForm.title,
        component: ProfilePageComponent
      },
      {
        path: ConstantsRoutes.passwordForm.path,
        title: ConstantsRoutes.passwordForm.title,
        component: ProfilePageComponent
      },
      {
        path: ConstantsRoutes.addressForm.path,
        title: ConstantsRoutes.addressForm.title,
        component: ProfilePageComponent
      },
      {
        path: ConstantsRoutes.dashboard.path,
        title: ConstantsRoutes.dashboard.title,
        component: DashboardPageComponent
      },
      {
        path: ConstantsRoutes.summaries.path,
        title: ConstantsRoutes.summaries.title,
        component: SummaryPageComponent
      },
      {
        path: ConstantsRoutes.summaryForm.path,
        title: ConstantsRoutes.summaryForm.title,
        component: SummaryPageComponent
      },
      {
        path: ConstantsRoutes.experiences.path,
        title: ConstantsRoutes.experiences.title,
        component: ExperiencePageComponent
      },
      {
        path: ConstantsRoutes.experienceForm.path,
        title: ConstantsRoutes.experienceForm.title,
        component: ExperiencePageComponent
      },
      {
        path: ConstantsRoutes.languages.path,
        title: ConstantsRoutes.languages.title,
        component: LanguagePageComponent
      },
      {
        path: ConstantsRoutes.languageForm.path,
        title: ConstantsRoutes.languageForm.title,
        component: LanguagePageComponent
      },
      {
        path: ConstantsRoutes.abilities.path,
        title: ConstantsRoutes.abilities.title,
        component: AbilityPageComponent
      },
      {
        path: ConstantsRoutes.abilityForm.path,
        title: ConstantsRoutes.abilityForm.title,
        component: AbilityPageComponent
      },
      {
        path: ConstantsRoutes.educations.path,
        title: ConstantsRoutes.educations.title,
        component: EducationPageComponent
      },
      {
        path: ConstantsRoutes.educationForm.path,
        title: ConstantsRoutes.educationForm.title,
        component: EducationPageComponent
      },
      {
        path: ConstantsRoutes.certifications.path,
        title: ConstantsRoutes.certifications.title,
        component: CertificationPageComponent
      },
      {
        path: ConstantsRoutes.certificationForm.path,
        title: ConstantsRoutes.certificationForm.title,
        component: CertificationPageComponent
      },
      {
        path: ConstantsRoutes.links.path,
        title: ConstantsRoutes.links.title,
        component: LinkPageComponent
      },
      {
        path: ConstantsRoutes.linkForm.path,
        title: ConstantsRoutes.linkForm.title,
        component: LinkPageComponent
      },
      {
        path: ConstantsRoutes.templates.path,
        title: ConstantsRoutes.templates.title,
        component: TemplatePageComponent
      },   
      {
        path: '**',
        redirectTo: ConstantsRoutes.dashboard.path
      },
    ]
  }
]

export default HomeRoutes;