import { Routes } from "@angular/router";
import { ConstantsRoutes } from "@utils/constants";
import { VerificationPageComponent } from "@home/pages/verification-page/verification-page.component";
import { DashboardPageComponent } from "@home/pages/dashboard-page/dashboard-page.component";
import { ProfilePageComponent } from "@home/pages/profile-page/profile-page.component";
import { TemplatePageComponent } from "@home/pages/template-page/template-page.component";
import { LinkPageComponent } from "@home/pages/link-page/link-page.component";
import { CertificationPageComponent } from "@home/pages/certification-page/certification-page.component";
import { EducationPageComponent } from "@home/pages/education-page/education-page.component";
import { AbilityPageComponent } from "@home/pages/ability-page/ability-page.component";
import { LocationPageComponent } from "@home/pages/location-page/location-page.component";
import { HomePageComponent } from "@home/pages/home-page/home-page.component";

export const HomeRoutes: Routes = [
  {
    path: '', component: HomePageComponent,
    children: [
      {
        path: ConstantsRoutes.VERIFICATION.path,
        title: ConstantsRoutes.VERIFICATION.title,
        component: VerificationPageComponent
      },
      {
        path: ConstantsRoutes.DASHBOARD.path,
        title: ConstantsRoutes.DASHBOARD.title,
        component: DashboardPageComponent
      },
      {
        path: ConstantsRoutes.PROFILE.path,
        title: ConstantsRoutes.PROFILE.title,
        component: ProfilePageComponent
      },
      {
        path: ConstantsRoutes.LOCATION.path,
        title: ConstantsRoutes.LOCATION.title,
        component: LocationPageComponent
      },
      {
        path: ConstantsRoutes.SUMMARIES.path,
        title: ConstantsRoutes.SUMMARIES.title,
        component: CertificationPageComponent
      },
      {
        path: ConstantsRoutes.EXPERIENCES.path,
        title: ConstantsRoutes.EXPERIENCES.title,
        component: TemplatePageComponent
      },
      {
        path: ConstantsRoutes.LANGUAGES.path,
        title: ConstantsRoutes.LANGUAGES.title,
        component: AbilityPageComponent
      },
      {
        path: ConstantsRoutes.ABILITIES.path,
        title: ConstantsRoutes.ABILITIES.title,
        component: AbilityPageComponent
      },
      {
        path: ConstantsRoutes.EDUCATIONS.path,
        title: ConstantsRoutes.EDUCATIONS.title,
        component: EducationPageComponent
      },
      {
        path: ConstantsRoutes.CERTIFICATIONS.path,
        title: ConstantsRoutes.CERTIFICATIONS.title,
        component: CertificationPageComponent
      },
      {
        path: ConstantsRoutes.LINKS.path,
        title: ConstantsRoutes.LINKS.title,
        component: LinkPageComponent
      },
      {
        path: ConstantsRoutes.TEMPLATES.path,
        title: ConstantsRoutes.TEMPLATES.title,
        component: TemplatePageComponent
      },   
      {
        path: '**',
        redirectTo: ConstantsRoutes.DASHBOARD.path
      },
    ]
  }
]

export default HomeRoutes;