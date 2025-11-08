import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { Router } from '@angular/router';
import { Constants, ConstantsRoutes } from '../../utils/constants';

@Component({
  selector: 'reset-password-page',
  imports: [MaterialModule],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.css',
  standalone: true
})
export class ResetPasswordPageComponent {
  
  patternPasswordMessage: string = `Mínimo 10 caracteres, una mayúscula, una minúscula, un número, un carácter especial ${Constants.PASSWORD_SPECIAL_PATTERN}`;
  
  resetPasswordForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  resetSuccess = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(Constants.PASSWORD_PATTERN)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Validador personalizado para verificar que las contraseñas coincidan
  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    
    if (password && confirmPassword && password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    const confirmPasswordControl = formGroup.get('confirmPassword');
    if (confirmPasswordControl?.hasError('passwordMismatch')) {
      confirmPasswordControl.setErrors(null);
    }
    
    return null;
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const { password } = this.resetPasswordForm.value;
      console.log('Nueva contraseña:', password);
      // Aquí puedes agregar la lógica para resetear la contraseña
      // Por ejemplo: this.authService.resetPassword(password, token);
      
      // Simular éxito
      this.resetSuccess = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    } else {
      this.markFormGroupTouched(this.resetPasswordForm);
    }
  }

  // Marcar todos los campos como tocados para mostrar errores
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getPasswordError(): string {
    const control = this.resetPasswordForm.get('password');
    if (control?.hasError('required')) return 'La contraseña es requerida';
    if (control?.hasError('pattern')) return `Formato de contraseña no válido: ${this.patternPasswordMessage}`;
    return '';
  }

  getConfirmPasswordError(): string {
    const control = this.resetPasswordForm.get('confirmPassword');
    if (control?.hasError('required')) return 'Confirma tu contraseña';
    if (control?.hasError('passwordMismatch')) return 'Las contraseñas no coinciden';
    return '';
  }

  goToLogin(): void {
    this.router.navigate([ConstantsRoutes.LOGIN.pathLink]);
  }
}
