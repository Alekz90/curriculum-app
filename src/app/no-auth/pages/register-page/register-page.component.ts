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
  patternPasswordMessage: string = `Mínimo 10 caracteres, una mayúscula, una minúscula, un número, un carácter especial ${Constants.PASSWORD_SPECIAL_PATTERN}`;

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

  // Validador personalizado para verificar que las contraseñas coincidan
  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    
    // Si ambos campos tienen valor y no coinciden, retorna error
    if (password && confirmPassword && password !== confirmPassword) {
      // Asigna el error al campo confirmPassword
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    // Si coinciden, limpia el error passwordMismatch del confirmPassword
    const confirmPasswordControl = formGroup.get('confirmPassword');
    if (confirmPasswordControl?.hasError('passwordMismatch')) {
      confirmPasswordControl.setErrors(null);
    }
    
    return null;
  }

  /*getEmailError(): string {
    const control = this.registerForm.get('email');
    if (control?.hasError('required')) return 'El correo es requerido';
    if (control?.hasError('pattern')) return 'El correo no es válido';
    return '';
  }

  getUserNameError() {
    const control = this.registerForm.get('userName');
    if (control?.hasError('required')) return 'El nombre de usuario es requerido';
    if (control?.hasError('pattern')) return 'Formato de nombre de usuario no válido';
    return '';
  }*/

  getPasswordError(): string {
    const control = this.registerForm.get('password');
    if (control?.hasError('required')) return 'La contraseña es requerida';
    if (control?.hasError('pattern')) return `Formato de contraseña no válido: ${this.patternPasswordMessage}`;
    return '';
  }

  getConfirmPasswordError(): string {
    const control = this.registerForm.get('confirmPassword');
    if (control?.hasError('required')) return 'Confirma tu contraseña';
    if (control?.hasError('passwordMismatch')) return 'Las contraseñas no coinciden';
    return '';
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

  showMessageError(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
