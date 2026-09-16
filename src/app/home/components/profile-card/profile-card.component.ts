import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '@utils/constants';
import { FormValidators } from '@utils/form-validators';
import { NavigationUtils } from '@utils/navigation-utils';
import { ConstantsRoutes } from '@utils/route-constants';
import { ProfileResponse } from '@interfaces/profile.interface';
import { MaterialCardModule } from '@modules/material-card.module';
import { ProfilesService } from '@app/services/profiles.service';
import { ConfirmModalComponent } from '@home-cards/confirm-modal.component/confirm-modal.component';

@Component({
  selector: 'profile-card',
  imports: [MaterialCardModule],
  templateUrl: './profile-card.component.html',
})
export class ProfileCardComponent {
  
  protected readonly VIEW_MODE    = Constants.VIEW_MODE;
  protected readonly PROFILE_FORM = Constants.PROFILE_FORM;
  protected readonly HIDDEN_MODE  = Constants.HIDDEN_MODE;

  private activatedRoute    = inject(ActivatedRoute);
  private formBuilder       = inject(FormBuilder);
  private dialog            = inject(MatDialog);
  private profilesService   = inject(ProfilesService);
  protected navigation      = inject(NavigationUtils);

  profile = input.required<ProfileResponse>();
  viewType  = signal<string>(this.VIEW_MODE);
  
  profileId = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');

  editForm: FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.maxLength(100)]],
    birthDate: ['', [Validators.required]],
    codePhone: ['', [Validators.required, Validators.pattern(Constants.PHONE_CODE_PATTERN)]],
    cellphone: ['', [Validators.required, Validators.pattern(Constants.PHONE_PATTERN)]],
  });

  ngOnChanges(): void {
    this.navigation.includesUrl(ConstantsRoutes.profileForm.pathLink)
      ? this.viewType.set(this.PROFILE_FORM)
      : this.navigation.includesUrl(ConstantsRoutes.profile.pathLink)
        ? this.viewType.set(this.VIEW_MODE)
        : this.viewType.set(this.HIDDEN_MODE);
  }

  ngOnInit(): void {
    if (this.profile()) {
      const birthDate = new Date(this.profile().birthDate);
      this.editForm.setValue({
        fullName: this.profile().fullName,
        birthDate: birthDate === Constants.EMPTY_DATE ? '' : birthDate,
        codePhone: this.profile().codePhone,
        cellphone: this.profile().cellphone,
      });
    }
  }

  save(): void {
    this.editForm.markAllAsTouched();
    if (this.editForm.valid) {
      this.profilesService.saveProfile(this.profileId(), this.editForm.value)
        .subscribe({
          next: (response) => {
            if (response.id === Constants.ID_SUCCESS) {
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

  getBirthDateFormatted(): string {
    const longFormat: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/Mexico_City'
    };

    const date = new Date(this.profile().birthDate);

    return date !== Constants.EMPTY_DATE ? date.toLocaleDateString('es-MX', longFormat) : '';
  }
  
  getFieldError(fieldName: string): string {
    return FormValidators.getFieldError(this.editForm.get(fieldName));
  }

  getInvalidField(fieldName: string): boolean {
    return FormValidators.getInvalidField(this.editForm.get(fieldName));
  }
}
