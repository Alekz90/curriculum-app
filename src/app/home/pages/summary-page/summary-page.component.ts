import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SummaryCardComponent } from '@home/components/summary-card/summary-card.component';
import { AuthenticationService } from '@services/authentication.service';
import { Constants } from '@utils/constants';
import { ConstantsRoutes } from '@utils/route-constants';
import { CurriculumService } from '@services/curriculum.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { NavigationUtils } from '@utils/navigation-utils';
import { SummaryResponse } from '@app/interfaces/summary.interface';
import { Result } from '@app/interfaces/result.interface';
import { ProfessionalDetailResponse } from '@app/interfaces/professional-detail.interface';

@Component({
  selector: 'summary-page',
  imports: [SummaryCardComponent],
  templateUrl: './summary-page.component.html',
})
export class SummaryPageComponent {

  private userId: string    = inject(AuthenticationService).userId() || '';
  private curriculumService = inject(CurriculumService);
  private snackBar          = inject(MatSnackBar);
  private router            = inject(Router);
  protected navigation      = inject(NavigationUtils);

  detailId  = signal<string>('');
  summary   = signal<SummaryResponse>(Constants.SummaryResponseEmpty);
  viewType  = signal<string>(Constants.EDITION);

  details = rxResource({
    params: () => ({ userId: this.userId }),
    stream: (resource) => 
      this.curriculumService.getProfessionalDetailByUserId(resource.params.userId)
        .pipe(
          tap(response => this.handleSuccess(response)),
        ),
  });

  ngOnInit(): void {
    this.router.url.includes(ConstantsRoutes.summaryForm.pathLink)
      ? this.viewType.set(Constants.FORM)
      : this.viewType.set(Constants.EDITION);
  }

  showMessageError(message: string) {
    this.snackBar.open(message, 'Cerrar');
  }

  handleSuccess(response: Result<ProfessionalDetailResponse>) {
    console.log('SummaryPageComponent - handleSuccess', response);
    this.detailId.set(response.result!.id || '');
    this.summary.set(response.result!.summary!);
  }
}
