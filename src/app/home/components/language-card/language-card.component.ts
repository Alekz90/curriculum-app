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

@Component({
  selector: 'language-card',
  imports: [MaterialCardModule],
  templateUrl: './language-card.component.html',
})
export class LanguageCardComponent {

  readonly LANGUAGE_LEVEL_ENUM = Constants.LANGUAGE_LEVEL_ENUM;
  //readonly LanguageLevelEnum = LanguageLevelEnum;
  //readonly LANGUAGE_LEVEL_MAP = Constants.LANGUAGE_LEVEL_MAP;


  readonly DASHBOARD = Constants.DASHBOARD;
  readonly EDITION = Constants.EDITION;
  readonly FORM = Constants.FORM;

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private dialog = inject(MatDialog);

  languages = input.required<LanguageResponse[]>();
  viewType = input<string>(Constants.DASHBOARD);
  
  editForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    level: ['', [Validators.required]],
  });
  
  languageId = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');

  ngOnInit(): void {
    const language = this.languages().find(lang => lang.id === this.languageId());
    console.log('Loaded language for editing:', language);
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

  languageComputed(language: LanguageResponse): string {
    return `• ${language.name} (${language.level})`;
  };
  
  goToEditMode(): void {
    console.log('Edit mode activated');
    this.router.navigate([ConstantsRoutes.languages.pathLink]);
  }deleteItem() {
      throw new Error('Method not implemented.');
    }
  
    goToFormMode(id: string): void {
      console.log('Navigating to form mode with id:', id);
  
      this.router.navigate([ConstantsRoutes.languageForm.pathLink, id]);
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
