import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';
import { Constants } from '@utils/constants';
import { AuthenticationService } from '@app/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Authentication } from '@app/interfaces/user.interface';
import { Result } from '@app/interfaces/result.interface';
import { NavigationUtils } from '@app/utils/navigation-utils';
import { FormValidators } from '@app/utils/form-validators';

@Component({
  selector: 'register-page',
  imports: [MaterialModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  protected readonly patternPasswordMessage = Constants.PATTERN_PASSWORD_MESSAGE;

  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;

  private formBuilder  = inject(FormBuilder);
  private authService  = inject(AuthenticationService);
  private snackBar     = inject(MatSnackBar);
  protected navigation = inject(NavigationUtils);

  registerForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(Constants.EMAIL_PATTERN)]],
    username: ['', [Validators.required, Validators.pattern(Constants.USERNAME_PATTERN)]],
    password: ['', [Validators.required, Validators.pattern(Constants.PASSWORD_PATTERN)]],
    confirmPassword: ['', [Validators.required]],
    acceptTerms: [false, [Validators.requiredTrue]]
  }, {
    validators: this.passwordMatchValidator // Validador a nivel de formulario
  });

  register(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;

      const { email, username, password, acceptTerms } = this.registerForm.value;     

      this.authService.register( { email, username, password, acceptTerms }).subscribe({
        next: (response) => this.successResponse(response),
        error: (error) => this.showMessageError(error.message || 'Error en registro', 'Cerrar'),
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
  
  successResponse(authentication: Result<Authentication>): void {
    if (authentication.id === Constants.ID_SUCCESS) {
      const user = authentication.result!.user!;
      user.verified 
        ? this.navigation.goToHome()
        : this.navigation.goToVerificationInfo(user.email);
    } else {
      this.showMessageError(authentication.message!, 'Cerrar');
    }
  }
  
  getFieldError(fieldName: string): string {
    return FormValidators.getFieldError(this.registerForm.get(fieldName));
  }

  getInvalidField(fieldName: string): boolean {
    return FormValidators.getInvalidField(this.registerForm.get(fieldName));
  }

  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    return FormValidators.passwordMatchValidator(formGroup.get('password'), formGroup.get('confirmPassword'));
  }

  getPasswordError(): string {
    return FormValidators.getPasswordError(this.registerForm.get('password'));
  }

  showMessageError(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
