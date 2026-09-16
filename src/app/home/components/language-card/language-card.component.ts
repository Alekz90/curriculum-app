import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '@app/utils/constants';
import { LanguageResponse } from '@interfaces/language.interface';
import { MaterialCardModule } from '@modules/material-card.module';
import { ConfirmModalComponent } from '../confirm-modal.component/confirm-modal.component';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { LanguageLevelEnum } from '@app/utils/enum';
import { NavigationUtils } from '@app/utils/navigation-utils';
import { CurriculumService } from '@app/services/curriculum.service';
import { FormValidators } from '@app/utils/form-validators';

@Component({
  selector: 'language-card',
  imports: [MaterialCardModule],
  templateUrl: './language-card.component.html',
})
export class LanguageCardComponent {

  readonly LANGUAGE_LEVEL_ENUM = Constants.LANGUAGE_LEVEL_ENUM;
  readonly DASHBOARD           = Constants.DASHBOARD_MODE;
  readonly EDITION             = Constants.VIEW_MODE;
  readonly FORM                = Constants.FORM_MODE;
  readonly PATH_NEW            = Constants.PATH_NEW
  
  private activatedRoute    = inject(ActivatedRoute);
  private formBuilder       = inject(FormBuilder);
  private dialog            = inject(MatDialog);
  private curriculumService = inject(CurriculumService);
  protected navigation      = inject(NavigationUtils);

  languages = input.required<LanguageResponse[]>();
  detailId  = input<string>('');
  viewType  = input<string>(Constants.DASHBOARD_MODE);
  
  editForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    level: ['', [Validators.required]],
  });
  
  languageId = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');

  ngOnInit(): void {
    const language = this.languages().find(lang => lang.id === this.languageId());
    if (language) {
      this.editForm.setValue({
        name: language.name || '',
        level: language.level || '',
      });
    }
  }
  
  save(): void {
    this.editForm.markAllAsTouched();
    if (this.editForm.valid) {
      this.curriculumService.saveLanguage(this.detailId(), this.languageId(), this.editForm.value)
        .subscribe({
          next: (response) => {
            if (response.id === Constants.ID_SUCCESS) {
              this.navigation.goToEditLanguage();
            }
          },
        });
    }
  }

  cancel(): void {
    if (this.editForm.pristine) {
      this.navigation.goToEditLanguage();
      return;
    }

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: Constants.CONFIRM_DIALOG_WIDTH,
      data: Constants.CANCEL_DIALOG_DATA
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.navigation.goToEditLanguage();
      }
    });
  }  

  languageValue(language: LanguageResponse): string {
    return Constants.LANGUAGE_LEVEL_ENUM.filter(level => level.key === language.level)[0]?.value || 'N/A';
  };
  
  deleteItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: Constants.CONFIRM_DIALOG_WIDTH,
      data: Constants.DELETE_DIALOG_DATA
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.curriculumService.deleteLanguage(this.detailId(), id)
          .subscribe(
            (deleted) => {
              if (deleted) {
                this.languages().splice(this.languages().findIndex(lang => lang.id === this.languageId()), 1);
              }
            }
          );
      }
    });
  }
  
  getFieldError(fieldName: string): string {
    return FormValidators.getFieldError(this.editForm.get(fieldName));
  }

  getInvalidField(fieldName: string): boolean {
    return FormValidators.getInvalidField(this.editForm.get(fieldName));
  }
}
