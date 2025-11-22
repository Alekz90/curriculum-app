import { Routes } from '@angular/router';
import { ConstantsRoutes } from './utils/route-constants';

export const routes: Routes = [
  { 
    path: ConstantsRoutes.init.path, 
    loadChildren: () => import('./no-auth/no-auth.routes').then(m => m.NoAuthRoutes),
  },
  { path: '**', redirectTo: ConstantsRoutes.init.path }
];
