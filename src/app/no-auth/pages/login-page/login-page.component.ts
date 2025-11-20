import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';
import { Router, RouterLink } from '@angular/router';
import { Constants } from '@utils/constants';
import { FormValidators } from '@app/utils/form-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '@app/services/authentication.service';
import { ConstantsRoutes } from '@app/utils/route-constants';

@Component({
  selector: 'login-page',
  imports: [MaterialModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  readonly recoveryPath = ConstantsRoutes.sendingRecovery.pathLink;
  readonly registerPath = ConstantsRoutes.register.pathLink;

  hidePassword = true;
  isLoading = false;
  private _formBuilder  = inject(FormBuilder);
  private _router       = inject(Router);
  private _authService  = inject(AuthenticationService);
  private _snackBar     = inject(MatSnackBar);

  loginForm: FormGroup = this._formBuilder.group({
    username: ['', [Validators.required, Validators.pattern(Constants.USERNAME_PATTERN)]],
    password: ['', [Validators.required, Validators.pattern(Constants.PASSWORD_PATTERN)]],
    rememberMe: [false]
  });

  login(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const { username, password, rememberMe } = this.loginForm.value;

      this._authService.login({ username, password, rememberMe }).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          if (response.id !== Constants.ID_SUCCESS) {
            this.showMessageError(response.message!, 'Cerrar');
          }
          this.goToHome();
        },
        error: (error) => {
          this.showMessageError(error.message || 'Error en login', 'Cerrar');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  getFieldError(fieldName: string): string {
    return FormValidators.getFieldError(this.loginForm.get(fieldName));
  }

  goToHome(): void {
    this._router.navigate([ConstantsRoutes.home.pathLink]);
  }

  showMessageError(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
