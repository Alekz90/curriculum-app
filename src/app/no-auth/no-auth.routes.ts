import { Routes } from "@angular/router";
import { ConstantsRoutes } from "@utils/route-constants";
import { InitPageComponent } from "@noauth/pages/init-page/init-page.component";
import { LoginPageComponent } from "@noauth/pages/login-page/login-page.component";
import { RegisterPageComponent } from "@noauth/pages/register-page/register-page.component";
import { ResetPasswordPageComponent } from "@noauth/pages/reset-password-page/reset-password-page.component";
import { SendingRecoveryPageComponent } from "@noauth/pages/sending-recovery-page/sending-recovery-page.component";


export const NoAuthRoutes: Routes = [
  {
    path: '', component: InitPageComponent,
    children: [
      { 
        path: ConstantsRoutes.login.path,
        title: ConstantsRoutes.login.title,
        component: LoginPageComponent
      },
      {
        path: ConstantsRoutes.register  .path,
        title: ConstantsRoutes.register.title,
        component: RegisterPageComponent
      },
      {
        path: ConstantsRoutes.resetPassword.path,
        title: ConstantsRoutes.resetPassword.title,
        component: ResetPasswordPageComponent
      },
      {
        path: ConstantsRoutes.sendingRecovery.path,
        title: ConstantsRoutes.sendingRecovery.title,
        component: SendingRecoveryPageComponent
      },
      { 
        path: ConstantsRoutes.home.path, 
        loadChildren: () => import('../home/home.routes').then(m => m.HomeRoutes),
      },
      {
        path: '**',
        redirectTo: ConstantsRoutes.login.path
      }
    ]
  }
]

export default NoAuthRoutes;
