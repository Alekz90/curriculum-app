import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/public/login-page/login-page.component';
import { RegisterPageComponent } from './pages/public/register-page/register-page.component';
import { SendingRecoveryPageComponent } from './pages/public/sending-recovery-page/sending-recovery-page.component';
import { ResetPasswordPageComponent } from './pages/public/reset-password-page/reset-password-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'sending-recovery', component: SendingRecoveryPageComponent },
  { path: 'reset-password/:id', component: ResetPasswordPageComponent },
  { 
    path: 'home', 
    loadChildren: () => import('./pages/home/home.routes').then(m => m.HomeRoutes),
  },
  { path: '**', redirectTo: 'login' }
];
