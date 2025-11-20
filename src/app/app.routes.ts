import { Routes } from '@angular/router';
import { ConstantsRoutes } from './utils/constants';

export const routes: Routes = [
  { 
    path: ConstantsRoutes.INIT.path, 
    loadChildren: () => import('./no-auth/no-auth.routes').then(m => m.NoAuthRoutes),
  },
  { path: '**', redirectTo: ConstantsRoutes.INIT.path }
];
