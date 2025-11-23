import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Constants } from '@app/utils/constants';
import { EducationResponse } from '@interfaces/education.interface';
import { MaterialCardModule } from '@modules/material-card.module';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '../confirm-modal.component/confirm-modal.component';
import { CurriculumService } from '@services/curriculum.service';
import { NavigationUtils } from '@utils/navigation-utils';
import { FormValidators } from '@app/utils/form-validators';

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
  readonly PATH_NEW = Constants.PATH_NEW;

  private activatedRoute    = inject(ActivatedRoute);
  private formBuilder       = inject(FormBuilder);
  private dialog            = inject(MatDialog);
  private curriculumService = inject(CurriculumService);
  protected navigation      = inject(NavigationUtils);

  educations    = input.required<EducationResponse[]>();
  detailId = input<string>('');
  viewType = input<string>(Constants.DASHBOARD);

  educationId = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');

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
  
  save(): void {
    this.editForm.markAllAsTouched();
    if (this.editForm.valid) {
      if (this.editForm.get('stillStudying')?.value) {
        this.editForm.get('endYear')?.setValue(null);
      }
      this.curriculumService.saveEducation(this.detailId(), this.educationId(), this.editForm.value)
        .subscribe({
          next: (response) => {
            if (response.id === Constants.ID_SUCCESS) {
              this.navigation.goToEditEducation();
            }
          },
        });
    }
  }

  cancel(): void {
    if (this.editForm.pristine) {
      this.navigation.goToEditEducation();
      return;
    }

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: Constants.CONFIRM_DIALOG_WIDTH,
      data: Constants.CANCEL_DIALOG_DATA
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.navigation.goToEditEducation();
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
        this.curriculumService.deleteEducation(this.detailId(), id)
          .subscribe(
            (deleted) => {
              if (deleted) {
                this.educations().splice(this.educations().findIndex(education => education.id === id), 1);
              }
            }
          );
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
  
  checkStillStudying(): void {
    this.editForm.get('stillStudying')?.value
      ? this.editForm.get('endYear')?.disable()
      : this.editForm.get('endYear')?.enable();  
  }

  getFieldError(fieldName: string): string {
    return FormValidators.getFieldError(this.editForm.get(fieldName));
  }

  getInvalidField(fieldName: string): boolean {
    return FormValidators.getInvalidField(this.editForm.get(fieldName));
  }
}
