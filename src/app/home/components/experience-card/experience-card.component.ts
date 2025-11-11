import { Component, inject, input } from '@angular/core';
import { ExperienceResponse } from '@interfaces/experience.interface';
import { MaterialCardModule } from '@modules/material-card.module';
import { ReplaceLinePipe } from '@pipes/replace-line-pipe';
import { Router } from '@angular/router';
import { ConstantsRoutes } from '@app/utils/constants';

@Component({
  selector: 'experience-card',
  imports: [MaterialCardModule, ReplaceLinePipe],
  templateUrl: './experience-card.component.html',
})
export class ExperienceCardComponent {
  experiences = input.required<ExperienceResponse[]>();
  isEdition = input<boolean>(false);
  editEnabled = input<boolean>(false);
  deleteEnabled = input<boolean>(false);
  
  router = inject(Router);

  
  generateCompanyPositionLabel(experience: ExperienceResponse): string {
    return `${experience.position} – ${experience.location.city},
     ${experience.location.state}, ${experience.location.country}`;
  }

  getExperienceDurationLabel(experience: ExperienceResponse): string {
    const start = experience.startDate;
    const end = experience.stillWorking ? new Date() : experience.endDate;

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    const startStr = start.toLocaleDateString('es-MX', options);
    const endStr = experience.stillWorking ? 'Presente' : end.toLocaleDateString('es-MX', options);
    return `${startStr} – ${endStr}`;
  }
  
  goToEditMode(): void {
    console.log('Edit mode activated');
    this.router.navigate([ConstantsRoutes.EXPERIENCES.pathLink]);
  }
}
