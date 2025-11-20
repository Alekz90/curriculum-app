import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';
import { Router, RouterLink } from '@angular/router';
import { Constants } from '@utils/constants';
import { AuthenticationService } from '@app/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { RegisterRequest } from '@app/interfaces/user.interface';

@Component({
  selector: 'register-page',
  imports: [MaterialModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  patternPasswordMessage: string = `Mínimo 10 caracteres, una mayúscula, una minúscula, un número, un carácter especial ${Constants.PASSWORD_SPECIAL_PATTERN}`;

  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;

  private _formBuilder  = inject(FormBuilder);
  private _router       = inject(Router);
  private _authService  = inject(AuthenticationService);
  private _snackBar     = inject(MatSnackBar);

  registerForm: FormGroup = this._formBuilder.group({
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

      this._authService.register( { email, username, password, acceptTerms }).subscribe({
        next: (response) => {
          console.log('Register successful:', response);
          if (response.id !== Constants.ID_SUCCESS) {
            this.showMessageError(response.message!, 'Cerrar');
          }
          this.goToHome();
        },
        error: (error) => {
          this.showMessageError(error.message || 'Error en registro', 'Cerrar');
        },
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

  // Marcar todos los campos como tocados para mostrar errores
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getEmailError(): string {
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
  }

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
  
  goToHome(): void {
    this._router.navigate([ConstantsRoutes.home.pathLink]);
  }

  showMessageError(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
