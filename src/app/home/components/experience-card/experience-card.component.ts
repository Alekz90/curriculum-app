import { Component, input } from '@angular/core';
import { ExperienceResponse } from '@app/interface/experience.interface';
import { MaterialModule } from '@app/material.module';

@Component({
  selector: 'experience-card',
  imports: [MaterialModule],
  templateUrl: './experience-card.component.html',
})
export class ExperienceCardComponent {
  experience = input.required<ExperienceResponse>();
  showActions = input<boolean>(false);
  
  companyPositionComputed(): string {
    return `${this.experience().position} – ${this.experience().location.city},
     ${this.experience().location.state}, ${this.experience().location.country}`;
  }

  durationComputed(): string {
    const start = this.experience().startDate;
    const end = this.experience().stillWorking ? new Date() : this.experience().endDate;

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    const startStr = start.toLocaleDateString('es-MX', options);
    const endStr = this.experience().stillWorking ? 'Presente' : end.toLocaleDateString('es-MX', options);

    return `${startStr} – ${endStr}`;
  }
}
