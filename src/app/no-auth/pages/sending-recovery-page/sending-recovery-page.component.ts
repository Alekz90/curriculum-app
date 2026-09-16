import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';
import { AuthenticationService } from '@services/authentication.service';
import { Constants } from '@utils/constants';
import { FormValidators } from '@utils/form-validators';
import { NavigationUtils } from '@utils/navigation-utils';

@Component({
  selector: 'sending-recovery-page',
  imports: [MaterialModule],
  templateUrl: './sending-recovery-page.component.html',
  styleUrls: ['./sending-recovery-page.component.css'],
  standalone: true
})
export class SendingRecoveryPageComponent {
  
  emailSent = signal(false);
  isLoading = signal(false);
  userEmail = signal('');

  private formBuilder  = inject(FormBuilder);
  private authService  = inject(AuthenticationService);
  protected navigation = inject(NavigationUtils);

  recoveryForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(Constants.EMAIL_PATTERN)]]
  });

  enviar(): void {
    if (this.recoveryForm.valid) {
      this.isLoading.set(true);
      const email = this.recoveryForm.get('email')?.value!;
      
      this.authService.sendingPasswordRecoveryEmail(email)
      .subscribe({
        next: (success) => {
          if (success) {
            this.emailSent.set(true);
            this.userEmail.set(email);
          }
          this.isLoading.set(false);          
        },
      });
    }
  }

  getFieldError(fieldName: string): string {
    return FormValidators.getFieldError(this.recoveryForm.get(fieldName));
  }

  getInvalidField(fieldName: string): boolean {
    return FormValidators.getInvalidField(this.recoveryForm.get(fieldName));
  }

  resendEmail(): void {
    this.emailSent.set(false);
    this.recoveryForm.patchValue({ email: this.userEmail() });
  }
}
