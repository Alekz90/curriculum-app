import { Component, inject, input, signal } from '@angular/core';
import { ProfessionalDetailResponse } from '@interfaces/professional-detail.interface';
import { ReplaceLinePipe } from '@pipes/replace-line-pipe';
import { MaterialCardModule } from '@modules/material-card.module';
import { Constants } from '@app/utils/constants';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmDialogData, ConfirmModalComponent } from '../confirm-modal.component/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'summary-card',
  imports: [MaterialCardModule, ReplaceLinePipe],
  templateUrl: './summary-card.component.html',
})
export class SummaryCardComponent {
  readonly DASHBOARD = Constants.DASHBOARD;
  readonly EDITION = Constants.EDITION;
  readonly FORM = Constants.FORM;

  //@Input({ required: true }) detail!: ProfessionalDetailResponse;

  detail = input.required<ProfessionalDetailResponse>();
  viewType = input<string>(Constants.DASHBOARD);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  dialog = inject(MatDialog);

  editForm: FormGroup = this.formBuilder.group({
    position: ['', [Validators.required, Validators.maxLength(5)]],
    summary: ['', [Validators.required, Validators.maxLength(1000)]],
  });
  
  goToEditMode(): void {
    console.log('Edit mode activated');
    this.router.navigate([ConstantsRoutes.summaries.pathLink]);
  }

  goToFormMode(): void {
    console.log('Form mode activated');
    this.router.navigate([ConstantsRoutes.summaryForm.pathLink]);
  }
  
  getSummaryError() {
    const control = this.editForm.get('summary');
    if (control?.hasError('required')) return 'El resumen profesional es requerido';
    if (control?.hasError('maxlength')) return 'El resumen profesional no puede exceder 1000 caracteres';
    return '';
  }
  getPositionError() {
    const control = this.editForm.get('position');
    if (control?.hasError('required')) return 'El puesto es requerido';
    if (control?.hasError('maxlength')) return 'El puesto no puede exceder 100 caracteres';
    return '';
  }

  cancel(): void {
    const data: ConfirmDialogData = {
      title: '¿Continuar con esta acción?',
      message: 'Esto puede afectar otros registros relacionados. ¿Deseas continuar?',
      confirmText: 'Sí, continuar',
      cancelText: 'No, cancelar',
      iconCancel: 'cancel',
      iconConfirm: 'warning',
      type: 'warning'
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '450px',
      data: data
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        console.log('Usuario confirmó la advertencia');
      }
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
}