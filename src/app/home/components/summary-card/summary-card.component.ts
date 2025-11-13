import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ProfessionalDetailResponse } from '@interfaces/professional-detail.interface';
import { ReplaceLinePipe } from '@pipes/replace-line-pipe';
import { MaterialCardModule } from '@modules/material-card.module';
import { Constants } from '@app/utils/constants';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@home/components/confirm-modal.component/confirm-modal.component';

@Component({
  selector: 'summary-card',
  imports: [MaterialCardModule, ReplaceLinePipe],
  templateUrl: './summary-card.component.html',
})
export class SummaryCardComponent implements OnInit {
  readonly DASHBOARD = Constants.DASHBOARD;
  readonly EDITION = Constants.EDITION;
  readonly FORM = Constants.FORM;

  detail = input.required<ProfessionalDetailResponse>();
  viewType = input<string>(Constants.DASHBOARD);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  dialog = inject(MatDialog);

  editForm: FormGroup = this.formBuilder.group({
    position: ['', [Validators.required, Validators.maxLength(100)]],
    summary: ['', [Validators.required, Validators.maxLength(1000)]],
  });

  ngOnInit(): void {
    this.editForm.setValue({
      position: this.detail().position || '',
      summary: this.detail().summary || '',
    });
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
      width: '450px',
      data: Constants.CANCEL_DIALOG_DATA
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.goToEditMode();
      }
    });
  }
  
  goToEditMode(): void {
    this.router.navigate([ConstantsRoutes.summaries.pathLink]);
  }

  goToFormMode(): void {
    this.router.navigate([ConstantsRoutes.summaryForm.pathLink, this.detail().userId]);
  }
  
  getFieldError(fieldName: string, label: string): string {
    const control = this.editForm.get(fieldName);
    if (control?.hasError('required')) return `Esta informacion es obligatoria`;
    if (control?.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `Esta información no puede exceder ${maxLength} caracteres`;
    }
    return '';
  }
}