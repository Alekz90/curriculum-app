import { Routes } from '@angular/router';
import { ConstantsRoutes } from './pages/utils/constants';

export const routes: Routes = [
  { 
    path: ConstantsRoutes.INIT.path, 
    loadChildren: () => import('./pages/public/public.routes').then(m => m.PublicRoutes),
  },
  { path: '**', redirectTo: ConstantsRoutes.INIT.path }
];
