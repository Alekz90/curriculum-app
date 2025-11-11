import { Component, inject, input } from '@angular/core';
import { ConstantsRoutes } from '@app/utils/constants';
import { EducationResponse } from '@interfaces/education.interface';
import { MaterialCardModule } from '@modules/material-card.module';
import { Router } from '@angular/router';

@Component({
  selector: 'education-card',
  imports: [MaterialCardModule],
  templateUrl: './education-card.component.html',
})
export class EducationCardComponent {

  educations = input.required<EducationResponse[]>();
  isEdition = input<boolean>(false);
  editEnabled = input<boolean>(false);
  deleteEnabled = input<boolean>(false);

  router = inject(Router);
  
  getEducationPeriod(education: EducationResponse): string {
    if (education.stillStudying) {
      return `${education.startYear} - Presente`;
    } else {
      return `${education.startYear} - ${education.endYear}`;
    }
  }

  goToEditMode() {
    console.log('Edit mode activated');
    this.router.navigate([ConstantsRoutes.EDUCATIONS.pathLink]);
  }
}
