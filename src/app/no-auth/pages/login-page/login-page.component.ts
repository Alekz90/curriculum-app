import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';
import { Router } from '@angular/router';
import { Constants } from '@utils/constants';
import { FormValidators } from '@app/utils/form-validators';
import { AuthenticationService } from '@app/services/authentication.service';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { Result } from '@app/interfaces/result.interface';
import { Authentication, User } from '@app/interfaces/user.interface';
import { NavigationUtils } from '@app/utils/navigation-utils';

@Component({
  selector: 'login-page',
  imports: [MaterialModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  hidePassword = true;
  isLoading = false;
  private formBuilder  = inject(FormBuilder);
  private router       = inject(Router);
  private authService  = inject(AuthenticationService);
  protected navigation  = inject(NavigationUtils);

  errorMessage = signal('');

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern(Constants.USERNAME_PATTERN)]],
    password: ['', [Validators.required, Validators.pattern(Constants.PASSWORD_PATTERN)]],
    rememberMe: [false]
  });

  login(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const { username, password, rememberMe } = this.loginForm.value;

      this.authService.login({ username, password, rememberMe }).subscribe({
        next: (response) => this.successResponse(response),
        error: (error) => this.showMessageError(error.message || 'Error en login'),
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  successResponse(authentication: Result<Authentication> ): void {
    if (authentication.id === Constants.ID_SUCCESS) {
      const user = authentication.result!.user!;
      user.verified
        ? this.navigation.goToHome() 
        : this.navigation.goToVerificationInfo(user.email);
    } else {
      this.showMessageError(authentication.message!);
    }
  }

  getFieldError(fieldName: string): string {
    return FormValidators.getFieldError(this.loginForm.get(fieldName));
  }

  getInvalidField(fieldName: string): boolean {
    return FormValidators.getInvalidField(this.loginForm.get(fieldName));
  }

  showMessageError(message: string) {
    this.errorMessage.set(message);
  }
}
