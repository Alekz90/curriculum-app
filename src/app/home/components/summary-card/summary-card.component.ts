import { Component, computed, inject, input } from '@angular/core';
import { ProfessionalDetailResponse } from '@interfaces/professional-detail.interface';
import { ReplaceLinePipe } from '@pipes/replace-line-pipe';
import { MaterialCardModule } from '@modules/material-card.module';
import { ConstantsRoutes } from '@app/utils/constants';
import { Router } from '@angular/router';
import { ViewTypeEnum } from '@app/utils/enum';

@Component({
  selector: 'summary-card',
  imports: [MaterialCardModule, ReplaceLinePipe],
  templateUrl: './summary-card.component.html',
})
export class SummaryCardComponent {

  readonly viewTypeEnum = ViewTypeEnum;

  //@Input({ required: true }) detail!: ProfessionalDetailResponse;

  detail = input.required<ProfessionalDetailResponse>();
  viewType = input<ViewTypeEnum>(ViewTypeEnum.DASHBOARD);


  
  router = inject(Router);
  
  goToEditMode(): void {
    console.log('Edit mode activated');
    this.router.navigate([ConstantsRoutes.SUMMARIES.pathLink]);
  }

  goToForm(): void {
    this.router.navigate([ConstantsRoutes.SUMMARIES.pathLink]);
  }
}
