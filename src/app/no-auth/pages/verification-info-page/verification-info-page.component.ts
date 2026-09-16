
import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@modules/material.module';
import { AuthenticationService } from '@services/authentication.service';
import { NavigationUtils } from '@app/utils/navigation-utils';

@Component({
  selector: 'verification-info-page',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './verification-info-page.component.html',
  styleUrl: './verification-info-page.component.css',
})
export class VerificationInfoPageComponent {

  private authService = inject(AuthenticationService);
  protected navigation = inject(NavigationUtils);

  isLoading = signal(false);
  message = signal('');
  success = signal(false);
  error = signal('');

  // Simulación: podrías obtener el email del usuario desde el state, servicio, etc.
  email = signal('');

  ngOnInit() {
    const navigationState = history.state;
    if (navigationState?.email) {
      this.email.set(navigationState?.email);
    }
  }

  resendVerificationEmail() {
    this.isLoading.set(true);
    this.message.set('');
    this.error.set('');
    // Aquí deberías llamar a tu servicio real
    setTimeout(() => {
      this.isLoading.set(false);
      this.success.set(true);
      this.message.set('Correo de verificación reenviado. Revisa tu bandeja de entrada.');
    }, 1500);
    // Ejemplo real:
    // this.authService.resendVerificationEmail(this.userEmail()).subscribe({
    //   next: () => {
    //     this.isLoading.set(false);
    //     this.success.set(true);
    //     this.message.set('Correo de verificación reenviado.');
    //   },
    //   error: () => {
    //     this.isLoading.set(false);
    //     this.error.set('No se pudo reenviar el correo. Intenta más tarde.');
    //   }
    // });
  }
}
