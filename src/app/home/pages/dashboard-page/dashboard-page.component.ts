import { Component, inject } from '@angular/core';
import { MaterialModule } from '@modules/material.module';
import { SummaryCardComponent } from "@home/components/summary-card/summary-card.component";
import { ExperienceCardComponent } from '@home/components/experience-card/experience-card.component';
import { LanguageCardComponent } from "@home/components/language-card/language-card.component";
import { AbilityCardComponent } from "@home/components/ability-card/ability-card.component";
import { EducationCardComponent } from "@home/components/education/education-card.component";
import { CertificationCardComponent } from "@home/components/certification-card/certification-card.component";
import { LinkCardComponent } from "@home/components/link-card/link-card.component";
import { LocationCardComponent } from '@home/components/location-card/location-card.component';
import { CurriculumService } from '@services/curriculum.service';

@Component({
  selector: 'dashboard-page',
  imports: [
    MaterialModule,
    SummaryCardComponent,
    ExperienceCardComponent,
    LanguageCardComponent,
    AbilityCardComponent,
    EducationCardComponent,
    CertificationCardComponent,
    LinkCardComponent,
    LocationCardComponent,
  ],
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent {

  service = inject(CurriculumService);
  detail = this.service.detail;
}