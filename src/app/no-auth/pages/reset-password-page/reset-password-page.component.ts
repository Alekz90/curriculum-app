import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '@utils/constants';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { FormValidators } from '@app/utils/form-validators';
import { NavigationUtils } from '@app/utils/navigation-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'reset-password-page',
  imports: [MaterialModule],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.css',
  standalone: true
})
export class ResetPasswordPageComponent {
  protected readonly patternPasswordMessage =  Constants.PATTERN_PASSWORD_MESSAGE;
  
  hidePassword = true;
  hideConfirmPassword = true;
  resetSuccess = false;

  private formBuilder  = inject(FormBuilder);
  private authService  = inject(AuthenticationService);
  protected navigation = inject(NavigationUtils);
  private activatedRoute    = inject(ActivatedRoute);

  resetPasswordForm: FormGroup = this.formBuilder.group({
    newPassword: ['', [Validators.required, Validators.pattern(Constants.PASSWORD_PATTERN)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: this.passwordMatchValidator
  });

  recoveryId    = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {      
      this.authService.recoveryPassword(this.recoveryId(), this.resetPasswordForm.value)
        .subscribe({
          next: (response) => {
            if (response) {
              this.resetSuccess = true;
              setTimeout(() => {
                this.navigation.goToLogin();
              }, 5000);
            }
          },
        });
    }
  }
  
  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    return FormValidators.passwordMatchValidator(formGroup.get('newPassword'), formGroup.get('confirmPassword'));
  }

  getPasswordError(): string {
    return FormValidators.getPasswordError(this.resetPasswordForm.get('newPassword'));
  }

  getInvalidField(fieldName: string): boolean {
    return FormValidators.getInvalidField(this.resetPasswordForm.get(fieldName));
  }

  getFieldError(fieldName: string): string {
    return FormValidators.getFieldError(this.resetPasswordForm.get(fieldName));
  }
}
