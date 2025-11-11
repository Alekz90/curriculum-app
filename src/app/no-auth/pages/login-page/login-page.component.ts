import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';
import { Router, RouterLink } from '@angular/router';
import { ConstantsRoutes } from '@utils/constants';

@Component({
  selector: 'login-page',
  imports: [MaterialModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm: FormGroup;
  hidePassword = true;
  readonly recoveryPath = ConstantsRoutes.SENDING_RECOVERY.pathLink;
  readonly registerPath = ConstantsRoutes.REGISTER.pathLink;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login data:', this.loginForm.value);
      // Aquí puedes agregar la lógica de autenticación
      // Por ejemplo: this.authService.login(this.loginForm.value);
    }
  }

  getEmailErrorMessage(): string {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'El email es requerido';
    }
    return emailControl?.hasError('email') ? 'Email no válido' : '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'La contraseña es requerida';
    }
    return passwordControl?.hasError('minlength') ? 'Mínimo 6 caracteres' : '';
  }

  goToHome(): void {
    console.log('Navegando a Home');
    this.router.navigate([ConstantsRoutes.HOME.pathLink]);
  }
}
