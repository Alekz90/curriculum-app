import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddressResponse } from '@interfaces/address.interface';
import { MaterialCardModule } from '@modules/material-card.module';
import { ProfilesService } from '@services/profiles.service';
import { Constants } from '@utils/constants';
import { NavigationUtils } from '@utils/navigation-utils';
import { ConstantsRoutes } from '@utils/route-constants';
import { ConfirmModalComponent } from '@home-cards/confirm-modal.component/confirm-modal.component';
import { FormValidators } from '@utils/form-validators';

@Component({
  selector: 'address-card',
  imports: [MaterialCardModule],
  templateUrl: './address-card.component.html',
})
export class AddressCardComponent {
  
  protected readonly VIEW_MODE     = Constants.VIEW_MODE;
  protected readonly ADDRESS_FORM  = Constants.ADDRESS_FORM;
  protected readonly HIDDEN_MODE   = Constants.HIDDEN_MODE;

  private activatedRoute    = inject(ActivatedRoute);
  private formBuilder       = inject(FormBuilder);
  private dialog            = inject(MatDialog);
  private profilesService   = inject(ProfilesService);
  protected navigation      = inject(NavigationUtils);

  address = input.required<AddressResponse>();
  profileId = input<string>('');
  viewType  = signal<string>(this.VIEW_MODE);
  
  addressId = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');

  editForm: FormGroup = this.formBuilder.group({
    city: ['', [Validators.required, Validators.maxLength(100)]],
    state: ['', [Validators.required, Validators.maxLength(100)]],
    country: ['', [Validators.required, Validators.maxLength(100)]],
    showInCurriculum: [false, [Validators.required]],
  });

  ngOnChanges(): void {
    this.navigation.includesUrl(ConstantsRoutes.addressForm.pathLink)
      ? this.viewType.set(this.ADDRESS_FORM)
      : this.navigation.includesUrl(ConstantsRoutes.profile.pathLink)
        ? this.viewType.set(this.VIEW_MODE)
        : this.viewType.set(this.HIDDEN_MODE);
  }

  ngOnInit(): void {
    if (this.address()) {
      this.editForm.setValue({
        city: this.address().city,
        state: this.address().state,
        country: this.address().country,
        showInCurriculum: this.address().showInCurriculum,
      });
    }
  }

  save(): void {
    this.editForm.markAllAsTouched();
    if (this.editForm.valid) {
      this.profilesService.saveAddress(this.profileId(), this.addressId(), this.editForm.value)
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
      
  getFieldError(fieldName: string): string {
    return FormValidators.getFieldError(this.editForm.get(fieldName));
  }

  getInvalidField(fieldName: string): boolean {
    return FormValidators.getInvalidField(this.editForm.get(fieldName));
  }
}
