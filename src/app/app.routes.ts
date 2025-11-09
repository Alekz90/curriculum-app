import { Routes } from '@angular/router';
import { ConstantsRoutes } from './utils/constants';

export const routes: Routes = [
  { 
    path: ConstantsRoutes.INIT.path, 
    loadChildren: () => import('./no-auth/public.routes').then(m => m.PublicRoutes),
  },
  { path: '**', redirectTo: ConstantsRoutes.INIT.path }
];
