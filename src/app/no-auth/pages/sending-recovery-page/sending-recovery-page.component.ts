import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { Router } from '@angular/router';
import { Constants, ConstantsRoutes } from '../../../utils/constants';

@Component({
  selector: 'sending-recovery-page',
  imports: [MaterialModule],
  templateUrl: './sending-recovery-page.component.html',
  styleUrl: './sending-recovery-page.component.css',
  standalone: true
})
export class SendingRecoveryPageComponent {
  
  recoveryForm: FormGroup;
  emailSent = false;
  isLoading = false;
  userEmail = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(Constants.EMAIL_PATTERN)]]
    });
  }

  onSubmit(): void {
    if (this.recoveryForm.valid) {
      this.isLoading = true;
      this.userEmail = this.recoveryForm.get('email')?.value;
      
      console.log('Enviando email de recuperación a:', this.userEmail);
      
      // Simular llamada al servicio de recuperación
      // this.authService.sendPasswordRecovery(this.userEmail).subscribe(...)
      
      // Simular delay de envío
      setTimeout(() => {
        this.isLoading = false;
        this.emailSent = true;
      }, 2000);
    } else {
      this.markFormGroupTouched(this.recoveryForm);
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
    const control = this.recoveryForm.get('email');
    if (control?.hasError('required')) return 'El email es requerido';
    if (control?.hasError('email') || control?.hasError('pattern')) return 'Email no válido';
    return '';
  }

  goToLogin(): void {
    this.router.navigate([ConstantsRoutes.LOGIN.pathLink]);
  }

  resendEmail(): void {
    this.emailSent = false;
    this.recoveryForm.patchValue({ email: this.userEmail });
  }
}
