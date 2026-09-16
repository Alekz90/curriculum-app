import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData } from '@app/interfaces/confirm-dialog-data';
import { MaterialCardModule } from '@modules/material-card.module';

@Component({
  selector: 'confirm-modal',
  imports: [MaterialCardModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
  standalone: true
})
export class ConfirmModalComponent {
  
  dialogRef = inject(MatDialogRef<ConfirmModalComponent>);
  data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

  // Valores por defecto
  title = this.data?.title || '¿Confirmar eliminación?';
  message = this.data?.message || '¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.';
  confirmText = this.data?.confirmText || 'Eliminar';
  cancelText = this.data?.cancelText || 'Cancelar';
  iconCancel = this.data?.iconCancel || 'cancel';
  iconConfirm = this.data?.iconConfirm || 'delete_forever';
  type = this.data?.type || 'danger';

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
