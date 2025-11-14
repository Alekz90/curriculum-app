import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Constants } from '@app/utils/constants';
import { EducationResponse } from '@interfaces/education.interface';
import { MaterialCardModule } from '@modules/material-card.module';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '../confirm-modal.component/confirm-modal.component';
import { ConstantsRoutes } from '@app/utils/route-constants';

@Component({
  selector: 'education-card',
  imports: [MaterialCardModule],
  templateUrl: './education-card.component.html',
})
export class EducationCardComponent implements OnInit {

  readonly EDUCATION_LEVEL_ENUM = Constants.EDUCATION_LEVEL_ENUM;
  readonly DASHBOARD = Constants.DASHBOARD;
  readonly EDITION = Constants.EDITION;
  readonly FORM = Constants.FORM;

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private dialog = inject(MatDialog);

  educations = input.required<EducationResponse[]>();
  viewType = input<string>(Constants.DASHBOARD);

  readonly maxYear = new Date().getFullYear();
  readonly minYear = this.maxYear - 100;

  editForm: FormGroup = this.formBuilder.group({
    level: ['', [Validators.required, Validators.maxLength(100)]],
    institute: ['', [Validators.required, Validators.maxLength(100)]],
    degree: ['', [Validators.required, Validators.maxLength(100)]],
    startYear: ['', [Validators.required, Validators.min(this.minYear), Validators.max(this.maxYear)]],
    endYear: ['', [Validators.required, Validators.min(this.minYear), Validators.max(this.maxYear)]],
    stillStudying: [false, [Validators.required, Validators.maxLength(100)]],
  });

  educationId = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');
  
  ngOnInit(): void {
    const education = this.educations().find(exp => exp.id === this.educationId());
    if (education) {
      this.editForm.setValue({
        level: education.level || '',
        institute: education.institute || '',
        degree: education.degree || '',
        startYear: education.startYear || '',
        endYear: education.endYear || '',
        stillStudying: education.stillStudying || false,
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

  getEducationPeriod(education: EducationResponse): string {
    if (education.stillStudying) {
      return `${education.startYear} - Presente`;
    } else {
      return `${education.startYear} - ${education.endYear}`;
    }
  }

  goToEditMode() {
    this.router.navigate([ConstantsRoutes.educations.pathLink]);
  }

  goToFormMode(id: string): void {
    this.router.navigate([ConstantsRoutes.educationForm.pathLink, id]);
  }
  
  getFieldError(fieldName: string): string {
    const control = this.editForm.get(fieldName);
    console.log('Checking errors for field:', fieldName, control?.errors);
    if (control?.hasError('required')) return `Esta informacion es obligatoria`;
    if (control?.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `Esta información no puede exceder ${maxLength} caracteres`;
    }
    if (control?.hasError('min')) {
      const min = control.getError('min').min;
      return `Este dato no puede ser menor que ${min}`;
    }
    if (control?.hasError('max')) {
      const max = control.getError('max').max;
      return `Este dato no puede ser mayor que ${max}`;
    }

    return '';
  }

  checkStillStudying(): void {
    this.editForm.get('stillStudying')?.value
      ? this.editForm.get('endYear')?.disable()
      : this.editForm.get('endYear')?.enable();  
  }
}
