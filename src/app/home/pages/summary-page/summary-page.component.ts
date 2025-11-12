import { Component, inject } from '@angular/core';
import { SummaryCardComponent } from '@app/home/components/summary-card/summary-card.component';
import { ViewTypeEnum } from '@app/utils/enum';
import { CurriculumService } from '@services/curriculum.service';

@Component({
  selector: 'summary-page',
  imports: [SummaryCardComponent],
  templateUrl: './summary-page.component.html',
})
export class SummaryPageComponent {
  service = inject(CurriculumService);
  detail = this.service.detail;
  viewType = ViewTypeEnum.EDITION;
}
