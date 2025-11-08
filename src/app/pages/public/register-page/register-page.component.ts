import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { Router, RouterLink } from '@angular/router';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'register-page',
  imports: [MaterialModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  standalone: true
})
export class RegisterPageComponent {

  patternPasswordMessage: string = `Mínimo 10 caracteres, una mayúscula, una minúscula, un número, un carácter especial ${Constants.PASSWORD_SPECIAL_PATTERN}`;

  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(Constants.EMAIL_PATTERN)]],
      userName: ['', [Validators.required, Validators.pattern(Constants.USERNAME_PATTERN)]],
      password: ['', [Validators.required, Validators.pattern(Constants.PASSWORD_PATTERN)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator // Validador a nivel de formulario
    });
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

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { confirmPassword, ...userData } = this.registerForm.value;
      console.log('Registro de usuario:', userData);
      // Aquí puedes agregar la lógica de registro
      // Por ejemplo: this.authService.register(userData);
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
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
}
