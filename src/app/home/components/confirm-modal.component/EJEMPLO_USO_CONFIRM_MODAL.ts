// EJEMPLO DE USO DEL MODAL DE CONFIRMACIÓN
// Copia este código en el componente donde quieras usar el modal

import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from './confirm-modal.component';
import { ConfirmDialogData } from '@app/interfaces/confirm-dialog-data';

export class MiComponente {
  
  dialog = inject(MatDialog);

  // ===============================================
  // EJEMPLO 1: Modal de confirmación básico
  // ===============================================
  deleteItem(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '450px',
      maxWidth: '95vw',
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        console.log('Usuario confirmó la eliminación');
        // Aquí ejecutas la lógica de eliminación
        // this.service.deleteItem(id).subscribe(...);
      } else {
        console.log('Usuario canceló');
      }
    });
  }

  // ===============================================
  // EJEMPLO 2: Modal personalizado con datos
  // ===============================================
  deleteItemWithCustomMessage(itemName: string): void {
    const data: ConfirmDialogData = {
      title: '¿Eliminar habilidad?',
      message: `¿Estás seguro de que deseas eliminar "${itemName}"? Esta acción no se puede deshacer.`,
      confirmText: 'Sí, eliminar',
      cancelText: 'No, cancelar',
      iconCancel: 'delete_forever',
      type: 'danger'
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '450px',
      data: data
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        console.log(`Eliminando ${itemName}...`);
        // Lógica de eliminación
      }
    });
  }

  // ===============================================
  // EJEMPLO 3: Modal de advertencia (no eliminar)
  // ===============================================
  showWarning(): void {
    const data: ConfirmDialogData = {
      title: '¿Continuar con esta acción?',
      message: 'Esto puede afectar otros registros relacionados. ¿Deseas continuar?',
      confirmText: 'Sí, continuar',
      cancelText: 'No, cancelar',
      iconCancel: 'warning',
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

  // ===============================================
  // EJEMPLO 4: Modal informativo
  // ===============================================
  showInfo(): void {
    const data: ConfirmDialogData = {
      title: 'Información importante',
      message: 'Esta acción enviará una notificación por email. ¿Deseas proceder?',
      confirmText: 'Sí, enviar',
      cancelText: 'Cancelar',
      iconCancel: 'info',
      type: 'info'
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '450px',
      data: data
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        console.log('Enviando notificación...');
      }
    });
  }

  // ===============================================
  // EJEMPLO 5: Con callback después de eliminar
  // ===============================================
  deleteWithCallback(id: number): void {
    this.openDeleteConfirmation(id, (success) => {
      if (success) {
        console.log('Registro eliminado exitosamente');
        // Recargar datos, mostrar mensaje, etc.
      }
    });
  }

  private openDeleteConfirmation(id: number, callback: (success: boolean) => void): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '450px',
      data: {
        title: '¿Confirmar eliminación?',
        message: 'Esta acción no se puede deshacer.',
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        type: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        // Llamar al servicio para eliminar
        // this.service.delete(id).subscribe({
        //   next: () => callback(true),
        //   error: () => callback(false)
        // });
        callback(true);
      }
    });
  }
}

// ===============================================
// TIPOS DE CONFIGURACIÓN DISPONIBLES
// ===============================================

/*
interface ConfirmDialogData {
  title?: string;          // Título del modal
  message?: string;        // Mensaje de confirmación
  confirmText?: string;    // Texto del botón de confirmar
  cancelText?: string;     // Texto del botón de cancelar
  icon?: string;          // Icono de Material Icons
  type?: 'danger' | 'warning' | 'info'; // Tipo de modal (afecta colores)
}

ICONOS COMUNES:
- delete_forever
- warning
- info
- error
- help
- check_circle
- cancel
*/
