import { Component, input } from '@angular/core';
import { MaterialModule } from '@app/material.module';
import { ProfessionalDetailResponse } from '@app/interface/professional-detail.interface';

@Component({
  selector: 'summary-card',
  imports: [MaterialModule],
  templateUrl: './summary-card.component.html',
})
export class SummaryCardComponent {

  //@Input({ required: true }) detail!: ProfessionalDetailResponse;

  detail = input.required<ProfessionalDetailResponse>();
  showActions = input<boolean>(false);
  
}
