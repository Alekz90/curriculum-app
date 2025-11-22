import { Component, computed, inject } from '@angular/core';
import { MaterialModule } from '@modules/material.module';
import { SummaryCardComponent } from "@home/components/summary-card/summary-card.component";
import { ExperienceCardComponent } from '@home/components/experience-card/experience-card.component';
import { LanguageCardComponent } from "@home/components/language-card/language-card.component";
import { AbilityCardComponent } from "@home/components/ability-card/ability-card.component";
import { EducationCardComponent } from "@home/components/education/education-card.component";
import { CertificationCardComponent } from "@home/components/certification-card/certification-card.component";
import { LinkCardComponent } from "@home/components/link-card/link-card.component";
import { CurriculumService } from '@services/curriculum.service';
import { AuthenticationService } from '@app/services/authentication.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Constants } from '@app/utils/constants';

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
  ],
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent {

  ID_SUCCESS = Constants.ID_SUCCESS;
  DETAIL_NOT_FOUND_ID = Constants.PROFESSIONAL_DETAIL_NOT_FOUND_ID;

  private userId: string = inject(AuthenticationService).userId();
  private curriculumService = inject(CurriculumService);

  resultDetail = rxResource({
    params: () => ({ userId: this.userId }),
    stream: (resource) => 
      this.curriculumService.getProfessionalDetailByUserId(resource.params.userId)
  });

  hasDetail = computed(() => {
    if (!this.resultDetail.hasValue()) {
      return false;
    }

    const response = this.resultDetail.value();

    if (response.id !== this.ID_SUCCESS || !response.result) {
      return false;
    }

    const detail = response.result;

    return detail.summary ||
      detail.experiences.length > 0 ||
      detail.languages.length > 0 ||
      detail.abilityGroups.length > 0 ||
      detail.educations.length > 0 ||
      detail.certifications.length > 0 ||
      detail.links.length > 0;
  });
}