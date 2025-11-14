import { Component, inject, input, signal } from '@angular/core';
import { ExperienceResponse } from '@interfaces/experience.interface';
import { MaterialCardModule } from '@modules/material-card.module';
import { ReplaceLinePipe } from '@pipes/replace-line-pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '@app/utils/constants';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '../confirm-modal.component/confirm-modal.component';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'experience-card',
  providers: [provideNativeDateAdapter()],
  imports: [MaterialCardModule, ReplaceLinePipe],
  templateUrl: './experience-card.component.html',
})
export class ExperienceCardComponent {

  readonly DASHBOARD = Constants.DASHBOARD;
  readonly EDITION = Constants.EDITION;
  readonly FORM = Constants.FORM;

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private dialog = inject(MatDialog);

  experiences = input.required<ExperienceResponse[]>();
  viewType = input<string>(Constants.DASHBOARD);

  editForm: FormGroup = this.formBuilder.group({
    company: ['', [Validators.required, Validators.maxLength(100)]],
    position: ['', [Validators.required, Validators.maxLength(100)]],
    city: ['', [Validators.required, Validators.maxLength(100)]],
    state: ['', [Validators.required, Validators.maxLength(100)]],
    country: ['', [Validators.required, Validators.maxLength(100)]],
    startDate: ['', [Validators.required, Validators.maxLength(100)]],
    endDate: ['', [Validators.required, Validators.maxLength(100)]],
    stillWorking: [false, [Validators.required, Validators.maxLength(100)]],
    activities: ['', [Validators.required, Validators.maxLength(2000)]],
  });
  
  experienceId = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');

  ngOnInit(): void {
    const experience = this.experiences().find(exp => exp.id === this.experienceId());
    if (experience) {
      this.editForm.setValue({
        company: experience.company || '',
        position: experience.position || '',
        city: experience.location.city || '',
        state: experience.location.state || '',
        country: experience.location.country || '',
        startDate: experience.startDate || '',
        endDate: experience.endDate || '',
        stillWorking: experience.stillWorking || false,
        activities: experience.activities || '',
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
  
  generateCompanyPositionLabel(experience: ExperienceResponse): string {
    return `${experience.position} – ${experience.location.city},
     ${experience.location.state}, ${experience.location.country}`;
  }

  getExperienceDurationLabel(experience: ExperienceResponse): string {
    const start = experience.startDate;
    const end = experience.stillWorking ? new Date() : experience.endDate;

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    const startStr = start.toLocaleDateString('es-MX', options);
    const endStr = experience.stillWorking ? 'Presente' : end.toLocaleDateString('es-MX', options);
    return `${startStr} – ${endStr}`;
  }
  
  goToEditMode(): void {
    this.router.navigate([ConstantsRoutes.experiences.pathLink]);
  }

  goToFormMode(id: string): void {
    this.router.navigate([ConstantsRoutes.experienceForm.pathLink, id]);
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

  checkStillWorking(): void {
    this.editForm.get('stillWorking')?.value
      ? this.editForm.get('endDate')?.disable()
      : this.editForm.get('endDate')?.enable();
  }
}
