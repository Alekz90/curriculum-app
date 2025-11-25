import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CertificationResponse } from '@interfaces/certification.interface';
import { MaterialCardModule } from '@modules/material-card.module';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '@utils/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../confirm-modal.component/confirm-modal.component';
import { CurriculumService } from '@services/curriculum.service';
import { NavigationUtils } from '@utils/navigation-utils';
import { FormValidators } from '@app/utils/form-validators';

@Component({
  selector: 'certification-card',
  imports: [MaterialCardModule],
  templateUrl: './certification-card.component.html',
})
export class CertificationCardComponent implements OnInit {

  readonly DASHBOARD = Constants.DASHBOARD_MODE;
  readonly EDITION = Constants.VIEW_MODE;
  readonly FORM = Constants.FORM_MODE;
  readonly PATH_NEW = Constants.PATH_NEW;

  private activatedRoute    = inject(ActivatedRoute);
  private formBuilder       = inject(FormBuilder);
  private dialog            = inject(MatDialog);
  private curriculumService = inject(CurriculumService);
  protected navigation      = inject(NavigationUtils);

  certifications    = input.required<CertificationResponse[]>();
  detailId = input<string>('');
  viewType = input<string>(Constants.DASHBOARD_MODE);
  
  certificationId = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');

  editForm: FormGroup = this.formBuilder.group({
    id: ['', ],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
  });

  ngOnInit(): void {
    const certification = this.certifications().find(cert => cert.id === this.certificationId());
    if (certification) {
      this.editForm.setValue({
        id: certification.id || '',
        name: certification.name || '',
        description: certification.description || '',
      });
    }
  }

  save(): void {
    this.editForm.markAllAsTouched();
    if (this.editForm.valid) {
      this.curriculumService.saveCertification(this.detailId(), this.certificationId(), this.editForm.value)
        .subscribe({
          next: (response) => {
            if (response.id === Constants.ID_SUCCESS) {
              this.navigation.goToEditCertification();
            }
          },
        });
    }
  }

  cancel(): void {
    if (this.editForm.pristine) {
      this.navigation.goToEditCertification();
      return;
    }

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: Constants.CONFIRM_DIALOG_WIDTH,
      data: Constants.CANCEL_DIALOG_DATA
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.navigation.goToEditCertification();
      }
    });
  }
  
  deleteItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: Constants.CONFIRM_DIALOG_WIDTH,
      data: Constants.DELETE_DIALOG_DATA
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.curriculumService.deleteCertification(this.detailId(), id)
          .subscribe(
            (deleted) => {
              if (deleted) {
                this.certifications().splice(this.certifications().findIndex(certification => certification.id === id), 1);
              }
            }
          );
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
