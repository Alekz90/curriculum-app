import { Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { VerificationPageComponent } from "./verification-page/verification-page.component";
import { DashboardPageComponent } from "./dashboard-home/dashboard-page.component";

export const HomeRoutes: Routes = [
  {
    path: '', component: HomePageComponent,
    children: [
      { path:'verification/:id', title: 'Verification', component: VerificationPageComponent },
      { path:'dashboard', title: 'Dashboard', component: DashboardPageComponent },
      { path:'**', redirectTo: 'dashboard' },
    ]
  }
]

export default HomeRoutes;