import { Component, computed, inject, signal } from '@angular/core';
import { MaterialModule } from '@modules/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsRoutes } from '@utils/route-constants';
import { AuthenticationService } from '@services/authentication.service';
import { Constants } from '@utils/constants';
import { NavigationUtils } from '@utils/navigation-utils';
import { Result } from '@app/interfaces/result.interface';


@Component({
  selector: 'verification-page',
  imports: [MaterialModule],
  templateUrl: './verification-page.component.html',
  styleUrl: './verification-page.component.css'
})
export class VerificationPageComponent {

  private router = inject(Router);
  private authService = inject(AuthenticationService);
  private activatedRoute = inject(ActivatedRoute);
  protected navigation = inject(NavigationUtils);
  
  verificationCode = signal<string[]>(Array(8).fill(''));
  isLoading = signal(false);
  errorMessage = signal('');
  resendTimer = signal(60);
  canResend = signal(false);
  
  isCodeComplete = computed(() => this.verificationCode().every(digit => digit !== ''));
  verificationId = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');
  
  private timerInterval: any;

  ngOnInit() {
    // Recibir datos enviados desde login/register
    const navigationState = history.state;
    
    if (navigationState?.origin === ConstantsRoutes.register.title) {
      this.startResendTimer();
    } else {
      this.cleanInterval();
    }
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  verifyCode() {
    const code = this.verificationCode().join('');
    
    if (code.length !== 8) {
      this.errorMessage.set('Por favor, ingresa el código completo');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.verifyAccount(this.verificationId(), code).subscribe({
      next: (response) => this.validateResponse(response),
      error: (response) => this.validateResponse(response.error),
    });
  }

  validateResponse(response: Result<boolean>) {
    this.isLoading.set(false);
    this.clearCode();
    if (response.id === Constants.ID_SUCCESS) {
      this.navigation.goToLogin();
    } else {
      this.errorMessage.set('Error al verificar el código' + `: ${response.message}.` || '.');
    }
  }

  onCodeInput(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Solo permitir números
    if (value && !/^[0-9]$/.test(value)) {
      input.value = '';
      return;
    }

    // Actualizar el código
    const code = [...this.verificationCode()];
    code[index] = value;
    this.verificationCode.set(code);
    this.errorMessage.set('');

    // Mover al siguiente input automáticamente
    if (value && index < 7) {
      const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Verificar automáticamente cuando se completen los 8 dígitos
    if (code.every(digit => digit !== '') && index === 7) {
      this.verifyCode();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    // Backspace: limpiar el campo actual y mover al anterior
    if (event.key === 'Backspace') {
      if (!input.value && index > 0) {
        const prevInput = document.getElementById(`code-${index - 1}`) as HTMLInputElement;
        if (prevInput) {
          const code = [...this.verificationCode()];
          code[index - 1] = '';
          this.verificationCode.set(code);
          prevInput.value = '';
          prevInput.focus();
        }
      } else {
        const code = [...this.verificationCode()];
        code[index] = '';
        this.verificationCode.set(code);
      }
    }

    // Arrow keys para navegación
    if (event.key === 'ArrowLeft' && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`) as HTMLInputElement;
      prevInput?.focus();
    }

    if (event.key === 'ArrowRight' && index < 7) {
      const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    const digits = pastedData.replace(/\D/g, '').slice(0, 8).split('');

    if (digits.length > 0) {
      const code = Array(8).fill('');
      digits.forEach((digit, i) => {
        code[i] = digit;
        const input = document.getElementById(`code-${i}`) as HTMLInputElement;
        if (input) {
          input.value = digit;
        }
      });
      this.verificationCode.set(code);

      // Enfocar el último input llenado
      const lastIndex = Math.min(digits.length - 1, 7);
      const lastInput = document.getElementById(`code-${lastIndex}`) as HTMLInputElement;
      lastInput?.focus();

      // Verificar automáticamente si se pegaron 8 dígitos
      if (digits.length === 8) {
        this.verifyCode();
      }
    }
  }

  clearCode() {
    this.verificationCode.set(Array(8).fill(''));
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach((input: any) => input.value = '');
    const firstInput = document.getElementById('code-0') as HTMLInputElement;
    firstInput?.focus();
  }

  resendCode() {
    if (!this.canResend()) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    // Aquí debes llamar al servicio para reenviar el código
    // this.authService.resendVerificationCode().subscribe({
    //   next: (response) => {
    //     this.isLoading.set(false);
    //     this.startResendTimer();
    //   },
    //   error: (error) => {
    //     this.isLoading.set(false);
    //     this.errorMessage.set('Error al reenviar el código');
    //   }
    // });

    // Simulación
    setTimeout(() => {
      this.isLoading.set(false);
      this.startResendTimer();
    }, 1000);
  }

  startResendTimer() {
    this.resendTimer.set(60);
    this.canResend.set(false);

    this.timerInterval = setInterval(() => {
      const currentTime = this.resendTimer();
      if (currentTime > 0) {
        this.resendTimer.set(currentTime - 1);
      } else {
        this.cleanInterval();
      }
    }, 1000);
  }

  cleanInterval() {
    this.canResend.set(true);
    clearInterval(this.timerInterval);
  }
}
