import { Component, inject } from '@angular/core';
import { CertificationCardComponent } from '@home/components/certification-card/certification-card.component';
import { CurriculumService } from '@services/curriculum.service';

@Component({
  selector: 'certification-page',
  imports: [CertificationCardComponent],
  templateUrl: './certification-page.component.html',
})
export class CertificationPageComponent {
  service = inject(CurriculumService);
  certifications = this.service.certifications;
}