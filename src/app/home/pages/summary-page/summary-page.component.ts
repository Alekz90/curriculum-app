import { Component, inject } from '@angular/core';
import { SummaryCardComponent } from '@app/home/components/summary-card/summary-card.component';
import { CurriculumService } from '@services/curriculum.service';
import { ProfessionalDetailResponse } from '@interfaces/professional-detail.interface';

@Component({
  selector: 'summary-page',
  imports: [SummaryCardComponent],
  templateUrl: './summary-page.component.html',
})
export class SummaryPageComponent {
  service = inject(CurriculumService);
  detail = this.service.detail;  
}
