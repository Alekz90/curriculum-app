import { Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { VerificationPageComponent } from "./verification-page/verification-page.component";
import { DashboardPageComponent } from "./dashboard-home/dashboard-page.component";
import { ConstantsRoutes } from "../utils/constants";

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
        path: '**',
        redirectTo: ConstantsRoutes.DASHBOARD.path
      },
    ]
  }
]

export default HomeRoutes;