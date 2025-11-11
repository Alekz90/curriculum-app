import { Component, inject } from '@angular/core';
import { EducationCardComponent } from '@home/components/education/education-card.component';
import { CurriculumService } from '@services/curriculum.service';

@Component({
  selector: 'education-page',
  imports: [EducationCardComponent],
  templateUrl: './education-page.component.html',
})
export class EducationPageComponent {
  service = inject(CurriculumService);
  educations = this.service.educations;
}
