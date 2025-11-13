import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SummaryCardComponent } from '@app/home/components/summary-card/summary-card.component';
import { Constants } from '@app/utils/constants';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { CurriculumService } from '@services/curriculum.service';

@Component({
  selector: 'summary-page',
  imports: [SummaryCardComponent],
  templateUrl: './summary-page.component.html',
})
export class SummaryPageComponent implements OnInit {
  viewType = signal<string>(Constants.EDITION);
  service = inject(CurriculumService);
  detail = this.service.detail;

  router = inject(Router);

  ngOnInit(): void {
    this.router.url.includes(ConstantsRoutes.summaryForm.pathLink)
      ? this.viewType.set(Constants.FORM)
      : this.viewType.set(Constants.EDITION);
  }
}
