import { Component, inject } from '@angular/core';
import { ExperienceCardComponent } from '@home/components/experience-card/experience-card.component';
import { CurriculumService } from '@services/curriculum.service';

@Component({
  selector: 'experience-page',
  imports: [ExperienceCardComponent],
  templateUrl: './experience-page.component.html',
})
export class ExperiencePageComponent {
  service = inject(CurriculumService);
  detail = this.service.detail;
}
