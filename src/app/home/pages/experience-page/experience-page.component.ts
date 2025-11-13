import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '@app/utils/constants';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { ExperienceCardComponent } from '@home/components/experience-card/experience-card.component';
import { CurriculumService } from '@services/curriculum.service';

@Component({
  selector: 'experience-page',
  imports: [ExperienceCardComponent],
  templateUrl: './experience-page.component.html',
})
export class ExperiencePageComponent implements OnInit {
  viewType = signal<string>(Constants.EDITION);
  service = inject(CurriculumService);
  detail = this.service.detail;
  router = inject(Router);

  ngOnInit(): void {
      this.router.url.includes(ConstantsRoutes.experienceForm.pathLink)
        ? this.viewType.set(Constants.FORM)
        : this.viewType.set(Constants.EDITION);
    }
}
