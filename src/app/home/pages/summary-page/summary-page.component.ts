import { Component, inject, signal } from '@angular/core';
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
import { SummaryEmpty, SummaryResponse } from '@app/interfaces/summary.interface';
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
  summary   = signal<SummaryResponse>(SummaryEmpty);
  viewType  = signal<string>(Constants.VIEW_MODE);

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
      ? this.viewType.set(Constants.FORM_MODE)
      : this.viewType.set(Constants.VIEW_MODE);
  }

  handleSuccess(response: Result<ProfessionalDetailResponse>) {
    this.detailId.set(response.result!.id || '');
    this.summary.set(response.result!.summary!);
  }
}
