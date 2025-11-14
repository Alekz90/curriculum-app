import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CertificationResponse } from '@interfaces/certification.interface';
import { MaterialCardModule } from '@modules/material-card.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '@app/utils/constants';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../confirm-modal.component/confirm-modal.component';

@Component({
  selector: 'certification-card',
  imports: [MaterialCardModule],
  templateUrl: './certification-card.component.html',
})
export class CertificationCardComponent implements OnInit {

  readonly DASHBOARD = Constants.DASHBOARD;
  readonly EDITION = Constants.EDITION;
  readonly FORM = Constants.FORM;

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private dialog = inject(MatDialog);
  
  certifications = input.required<CertificationResponse[]>();
  viewType = input<string>(Constants.DASHBOARD);

  editForm: FormGroup = this.formBuilder.group({
    id: ['', ],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
  });
  
  certificationId = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');

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

  deleteItem() {
    throw new Error('Method not implemented.');
  }

  save(): void {
    this.editForm.markAllAsTouched();
    if (this.editForm.valid) {
      console.log('Form data:', this.editForm.value);
      // Aquí puedes agregar la lógica de autenticación
      // Por ejemplo: this.authService.login(this.editForm.value);
    }
  }

  cancel(): void {
    if (this.editForm.pristine) {
      this.goToEditMode();
      return;
    }

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: Constants.CONFIRM_DIALOG_WIDTH,
      data: Constants.CANCEL_DIALOG_DATA
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.goToEditMode();
      }
    });
  }
  
  goToEditMode(): void {
    this.router.navigate([ConstantsRoutes.certifications.pathLink]);
  }

  goToFormMode(id: string): void {
    this.router.navigate([ConstantsRoutes.certificationForm.pathLink, id]);
  }

  getFieldError(fieldName: string): string {
    const control = this.editForm.get(fieldName);
    if (control?.hasError('required')) return `Esta informacion es obligatoria`;
    if (control?.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `Esta información no puede exceder ${maxLength} caracteres`;
    }
    return '';
  }
}
