import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '@app/utils/constants';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { EducationCardComponent } from '@home/components/education/education-card.component';
import { CurriculumService } from '@services/curriculum.service';

@Component({
  selector: 'education-page',
  imports: [EducationCardComponent],
  templateUrl: './education-page.component.html',
})
export class EducationPageComponent implements OnInit {
  service = inject(CurriculumService);
  educations = this.service.educations;
  viewType = signal<string>(Constants.EDITION);
  router = inject(Router);
  
  ngOnInit(): void {
    this.router.url.includes(ConstantsRoutes.educationForm.pathLink)
      ? this.viewType.set(Constants.FORM)
      : this.viewType.set(Constants.EDITION);
  }
}
