import { Routes } from "@angular/router";
import { ConstantsRoutes } from "@utils/constants";
import { InitPageComponent } from "@noauth/pages/init-page/init-page.component";
import { LoginPageComponent } from "@noauth/pages/login-page/login-page.component";
import { RegisterPageComponent } from "@noauth/pages/register-page/register-page.component";
import { ResetPasswordPageComponent } from "@noauth/pages/reset-password-page/reset-password-page.component";
import { SendingRecoveryPageComponent } from "@noauth/pages/sending-recovery-page/sending-recovery-page.component";


export const PublicRoutes: Routes = [
  {
    path: '', component: InitPageComponent,
    children: [
      { 
        path: ConstantsRoutes.LOGIN.path,
        title: ConstantsRoutes.LOGIN.title,
        component: LoginPageComponent
      },
      {
        path: ConstantsRoutes.REGISTER.path,
        title: ConstantsRoutes.REGISTER.title,
        component: RegisterPageComponent
      },
      {
        path: ConstantsRoutes.RESET_PASSWORD.path,
        title: ConstantsRoutes.RESET_PASSWORD.title,
        component: ResetPasswordPageComponent
      },
      {
        path: ConstantsRoutes.SENDING_RECOVERY.path,
        title: ConstantsRoutes.SENDING_RECOVERY.title,
        component: SendingRecoveryPageComponent
      },
      { 
        path: ConstantsRoutes.HOME.path, 
        loadChildren: () => import('../home/home.routes').then(m => m.HomeRoutes),
      },
      {
        path: '**',
        redirectTo: ConstantsRoutes.LOGIN.path
      }
    ]
  }
]

export default PublicRoutes;
