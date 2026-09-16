import { Component, inject, input, signal } from '@angular/core';
import { MaterialCardModule } from '@app/modules/material-card.module';
import { Constants } from '@app/utils/constants';
import { FormValidators } from '@app/utils/form-validators';
import { ConfirmModalComponent } from '../confirm-modal.component/confirm-modal.component';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProfilesService } from '@app/services/profiles.service';
import { NavigationUtils } from '@app/utils/navigation-utils';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'password-card',
  imports: [MaterialCardModule],
  templateUrl: './password-card.component.html',
})
export class PasswordCardComponent {
  protected readonly patternPasswordMessage = Constants.PATTERN_PASSWORD_MESSAGE;
  
  protected readonly VIEW_MODE      = Constants.VIEW_MODE;
  protected readonly PASSWORD_FORM  = Constants.PASSWORD_FORM;
  protected readonly HIDDEN_MODE    = Constants.HIDDEN_MODE;
  
  protected hideOldPassword = true;
  protected hideNewPassword = true;
  protected hideConfirmPassword = true;

  private activatedRoute    = inject(ActivatedRoute);
  private formBuilder       = inject(FormBuilder);
  private dialog            = inject(MatDialog);
  private profilesService   = inject(ProfilesService);
  protected navigation      = inject(NavigationUtils);

  user = input.required<User>();

  viewType  = signal<string>(this.VIEW_MODE);
  userId    = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');

  editForm: FormGroup = this.formBuilder.group({
    oldPassword: ['', [Validators.required, Validators.maxLength(Constants.PASSWORD_MAX_LENGTH)]],
    newPassword: ['', [Validators.required, Validators.pattern(Constants.PASSWORD_PATTERN)]],
    confirmPassword: ['', [Validators.required]],
  }, { validators: [this.passwordMatchValidator.bind(this), this.passwordNotMatchValidator.bind(this)] });

  ngOnChanges(): void {
    this.navigation.includesUrl(ConstantsRoutes.passwordForm.pathLink)
      ? this.viewType.set(this.PASSWORD_FORM)
      : this.navigation.includesUrl(ConstantsRoutes.profile.pathLink)
        ? this.viewType.set(this.VIEW_MODE)
        : this.viewType.set(this.HIDDEN_MODE);
  }

  save(): void {
    this.editForm.markAllAsTouched();
    if (this.editForm.valid) {
      this.profilesService.changePassword(this.userId(), this.editForm.value)
        .subscribe({
          next: (response) => {
            if (response) {
              this.navigation.goToProfile();
            }
          },
        });
    }
  }
  
  cancel(): void {
    if (this.editForm.pristine) {
      this.navigation.goToProfile();
      return;
    }

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: Constants.CONFIRM_DIALOG_WIDTH,
      data: Constants.CANCEL_DIALOG_DATA
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.navigation.goToProfile();
      }
    });
  }
  
  getFieldError(fieldName: string): string {
    return FormValidators.getFieldError(this.editForm.get(fieldName));
  }

  getInvalidField(fieldName: string): boolean {
    return FormValidators.getInvalidField(this.editForm.get(fieldName));
  }

  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    return FormValidators.passwordMatchValidator(formGroup.get('newPassword'), formGroup.get('confirmPassword'));
  }

  passwordNotMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    return FormValidators.passwordNotMatchValidator(formGroup.get('oldPassword'), formGroup.get('newPassword'));
  }

  getPasswordError(): string {
    return FormValidators.getPasswordError(this.editForm.get('newPassword'));
  }
}
