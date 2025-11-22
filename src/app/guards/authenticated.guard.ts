import { inject } from '@angular/core';
import type { CanMatchFn } from '@angular/router';
import { NavigationUtils } from '@utils/navigation-utils';
import { AuthenticationService } from '@services/authentication.service';
import { firstValueFrom } from 'rxjs';

export const AuthenticatedGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthenticationService);
  const navigation = inject(NavigationUtils);

  console.log('AuthenticatedGuard#canMatch called');

  const isAuthenticated = await firstValueFrom(authService.checkStatus());

  if (!isAuthenticated) {
    navigation.goToLogin();
  }

  return isAuthenticated;
};
