import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ReplaceLinePipe } from '@pipes/replace-line-pipe';
import { MaterialCardModule } from '@modules/material-card.module';
import { Constants } from '@utils/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@home-cards/confirm-modal.component/confirm-modal.component';
import { SummaryResponse } from '@interfaces/summary.interface';
import { NavigationUtils } from '@utils/navigation-utils';
import { CurriculumService } from '@services/curriculum.service';
import { ActivatedRoute } from '@angular/router';
import { FormValidators } from '@utils/form-validators';

@Component({
  selector: 'summary-card',
  imports: [MaterialCardModule, ReplaceLinePipe],
  templateUrl: './summary-card.component.html',
})
export class SummaryCardComponent implements OnInit {
  
  readonly DASHBOARD = Constants.DASHBOARD_MODE;
  readonly EDITION = Constants.VIEW_MODE;
  readonly FORM = Constants.FORM_MODE;
  readonly PATH_NEW = Constants.PATH_NEW

  private activatedRoute    = inject(ActivatedRoute);
  private formBuilder       = inject(FormBuilder);
  private dialog            = inject(MatDialog);
  private curriculumService = inject(CurriculumService);
  protected navigation      = inject(NavigationUtils);

  detail   = input.required<SummaryResponse>();
  detailId = input<string>('');
  viewType = input<string>(Constants.DASHBOARD_MODE);

  editForm: FormGroup = this.formBuilder.group({
    position: ['', [Validators.required, Validators.maxLength(100)]],
    summary: ['', [Validators.required, Validators.maxLength(1000)]],
  });

  summaryId = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');

  ngOnInit(): void {
    if (this.detail()) {
      this.editForm.setValue({
        position: this.detail().position || '',
        summary: this.detail().summary || '',
      });
    }
  }

  save(): void {
    this.editForm.markAllAsTouched();
    if (this.editForm.valid) {
      this.curriculumService.saveSummary(this.detailId(), this.summaryId(), this.editForm.value)
        .subscribe({
          next: (response) => {
            if (response.id === Constants.ID_SUCCESS) {
              this.navigation.goToEditSummary();
            }
          },
        });
    }
  }

  cancel(): void {
    if (this.editForm.pristine) {
      this.navigation.goToEditSummary();
      return;
    }

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: Constants.CONFIRM_DIALOG_WIDTH,
      data: Constants.CANCEL_DIALOG_DATA
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.navigation.goToEditSummary();
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