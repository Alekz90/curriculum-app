import { Component, inject, input, signal } from '@angular/core';
import { ExperienceResponse } from '@interfaces/experience.interface';
import { MaterialCardModule } from '@modules/material-card.module';
import { ReplaceLinePipe } from '@pipes/replace-line-pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '@utils/constants';
import { ConstantsRoutes } from '@utils/route-constants';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '../confirm-modal.component/confirm-modal.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CurriculumService } from '@services/curriculum.service';
import { NavigationUtils } from '@utils/navigation-utils';
import { FormValidators } from '@app/utils/form-validators';

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
  readonly PATH_NEW = Constants.PATH_NEW;
  
  private activatedRoute    = inject(ActivatedRoute);
  private formBuilder       = inject(FormBuilder);
  private dialog            = inject(MatDialog);
  private curriculumService = inject(CurriculumService);
  protected navigation      = inject(NavigationUtils);

  experiences = input.required<ExperienceResponse[]>();
  detailId    = input<string>('');
  viewType    = input<string>(Constants.DASHBOARD);

  experienceId = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');

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

  save(): void {
    this.editForm.markAllAsTouched();
    if (this.editForm.valid) {

      const experienceData = {
        ...this.editForm.value,
        location: {
          city: this.editForm.value.city,
          state: this.editForm.value.state,
          country: this.editForm.value.country,
          showInCurriculum: true,
        }
      };
      delete experienceData.city;
      delete experienceData.state;
      delete experienceData.country;

      this.curriculumService.saveExperience(this.detailId(), this.experienceId(), experienceData)
        .subscribe({
          next: (response) => {
            if (response.id === Constants.ID_SUCCESS) {
              this.navigation.goToEditExperience();
            }
          },
        });
    }
  }

  cancel(): void {
    if (this.editForm.pristine) {
      this.navigation.goToEditExperience();
      return;
    }

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: Constants.CONFIRM_DIALOG_WIDTH,
      data: Constants.CANCEL_DIALOG_DATA
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
      this.navigation.goToEditExperience();
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
        this.curriculumService.deleteExperience(this.detailId(), id)
          .subscribe(
            (deleted) => {
              if (deleted) {
                this.experiences().splice(this.experiences().findIndex(exp => exp.id === id), 1);
              }
            }
          );
      }
    });
  }
  
  generateCompanyPositionLabel(experience: ExperienceResponse): string {
    return `${experience.position} – ${experience.location.city},
     ${experience.location.state}, ${experience.location.country}`;
  }

  getExperienceDurationLabel(experience: ExperienceResponse): string {
    const start = new Date(experience.startDate);
    const end = experience.stillWorking ? new Date() : new Date(experience.endDate);

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    const startStr = start.toLocaleDateString('es-MX', options);
    const endStr = experience.stillWorking ? 'Presente' : end.toLocaleDateString('es-MX', options);
    return `${startStr} – ${endStr}`;
  }
  
  checkStillWorking(): void {
    this.editForm.get('stillWorking')?.value
      ? this.editForm.get('endDate')?.disable()
      : this.editForm.get('endDate')?.enable();
  }
    
  getFieldError(fieldName: string): string {
    return FormValidators.getFieldError(this.editForm.get(fieldName));
  }

  getInvalidField(fieldName: string): boolean {
    return FormValidators.getInvalidField(this.editForm.get(fieldName));
  }
}
