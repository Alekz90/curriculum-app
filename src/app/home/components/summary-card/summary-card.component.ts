import { Component, inject, input } from '@angular/core';
import { ProfessionalDetailResponse } from '@interfaces/professional-detail.interface';
import { ReplaceLinePipe } from '@pipes/replace-line-pipe';
import { MaterialCardModule } from '@modules/material-card.module';
import { ConstantsRoutes } from '@app/utils/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'summary-card',
  imports: [MaterialCardModule, ReplaceLinePipe],
  templateUrl: './summary-card.component.html',
})
export class SummaryCardComponent {

  //@Input({ required: true }) detail!: ProfessionalDetailResponse;

  detail = input.required<ProfessionalDetailResponse>();
  isEdition = input<boolean>(false);
  editEnabled = input<boolean>(false);
  deleteEnabled = input<boolean>(false);
  
  router = inject(Router);
  
  goToEditMode(): void {
    console.log('Edit mode activated');
    this.router.navigate([ConstantsRoutes.SUMMARIES.pathLink]);
  }
}
