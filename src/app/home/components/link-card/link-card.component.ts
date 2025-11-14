import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '@app/utils/constants';
import { LinkResponse } from '@interfaces/link.interface';
import { MaterialCardModule } from '@modules/material-card.module';
import { ConfirmModalComponent } from '../confirm-modal.component/confirm-modal.component';
import { ConstantsRoutes } from '@app/utils/route-constants';

@Component({
  selector: 'link-card',
  imports: [MaterialCardModule],
  templateUrl: './link-card.component.html',
})
export class LinkCardComponent {

  readonly DASHBOARD = Constants.DASHBOARD;
  readonly EDITION = Constants.EDITION;
  readonly FORM = Constants.FORM;

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private dialog = inject(MatDialog);

  links = input.required<LinkResponse[]>();
  isEdition = input<boolean>(false);
  editEnabled = input<boolean>(false);
  deleteEnabled = input<boolean>(false);

  viewType = input<string>(Constants.DASHBOARD);

  editForm: FormGroup = this.formBuilder.group({
    id: ['', ],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    url: ['', [Validators.required, Validators.maxLength(300)]],
  });
  
  linkId = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');
  
  ngOnInit(): void {
      const link = this.links().find(link => link.id === this.linkId());
      if (link) {
        this.editForm.setValue({
          id: link.id || '',
          name: link.name || '',
          url: link.url || '',
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
    this.router.navigate([ConstantsRoutes.links.pathLink]);
  }
  
  goToFormMode(id: string): void {
    this.router.navigate([ConstantsRoutes.linkForm.pathLink, id]);
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
