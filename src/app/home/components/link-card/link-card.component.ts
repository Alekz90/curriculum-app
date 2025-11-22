import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '@utils/constants';
import { LinkResponse } from '@interfaces/link.interface';
import { MaterialCardModule } from '@modules/material-card.module';
import { ConfirmModalComponent } from '../confirm-modal.component/confirm-modal.component';
import { NavigationUtils } from '@utils/navigation-utils';
import { CurriculumService } from '@services/curriculum.service';
import { FormValidators } from '@utils/form-validators';

@Component({
  selector: 'link-card',
  imports: [MaterialCardModule],
  templateUrl: './link-card.component.html',
})
export class LinkCardComponent {

  readonly DASHBOARD = Constants.DASHBOARD;
  readonly EDITION = Constants.EDITION;
  readonly FORM = Constants.FORM;
  readonly PATH_NEW = Constants.PATH_NEW;

  private activatedRoute    = inject(ActivatedRoute);
  private formBuilder       = inject(FormBuilder);
  private dialog            = inject(MatDialog);
  private curriculumService = inject(CurriculumService);
  protected navigation      = inject(NavigationUtils);

  links    = input.required<LinkResponse[]>();
  detailId = input<string>('');
  viewType = input<string>(Constants.DASHBOARD);
  
  linkId = signal(this.activatedRoute.snapshot.paramMap.get('id') || '');

  editForm: FormGroup = this.formBuilder.group({
    id: ['', ],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    url: ['', [Validators.required, Validators.maxLength(300)]],
  });
  
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
  
  save(): void {
    this.editForm.markAllAsTouched();
    if (this.editForm.valid) {
      this.curriculumService.saveLink(this.detailId(), this.linkId(), this.editForm.value)
        .subscribe({
          next: (response) => {
            if (response.id === Constants.ID_SUCCESS) {
              this.navigation.goToEditLink();
            }
          },
        });
    }
  }
  
  cancel(): void {
    if (this.editForm.pristine) {
      this.navigation.goToEditLink();
      return;
    }

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: Constants.CONFIRM_DIALOG_WIDTH,
      data: Constants.CANCEL_DIALOG_DATA
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.navigation.goToEditLink();
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
        this.curriculumService.deleteLink(this.detailId(), id)
          .subscribe(
            (deleted) => {
              if (deleted) {
                this.links().splice(this.links().findIndex(link => link.id === id), 1);
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
