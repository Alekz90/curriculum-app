import { Component, inject, OnInit, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ExperienceResponse } from '@app/interfaces/experience.interface';
import { ProfessionalDetailResponse } from '@app/interfaces/professional-detail.interface';
import { Result } from '@app/interfaces/result.interface';
import { AuthenticationService } from '@app/services/authentication.service';
import { Constants } from '@app/utils/constants';
import { NavigationUtils } from '@app/utils/navigation-utils';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { ExperienceCardComponent } from '@home/components/experience-card/experience-card.component';
import { CurriculumService } from '@services/curriculum.service';
import { tap } from 'rxjs';

@Component({
  selector: 'experience-page',
  imports: [ExperienceCardComponent],
  templateUrl: './experience-page.component.html',
})
export class ExperiencePageComponent implements OnInit {

  private userId            = inject(AuthenticationService).userId();
  private curriculumService = inject(CurriculumService);
  private router            = inject(Router);
  protected navigation      = inject(NavigationUtils);
    
  detailId    = signal<string>('');
  experiences = signal<ExperienceResponse[]>([]);
  viewType    = signal<string>(Constants.VIEW_MODE);

  ngOnInit(): void {
    this.router.url.includes(ConstantsRoutes.experienceForm.pathLink)
      ? this.viewType.set(Constants.FORM_MODE)
      : this.viewType.set(Constants.VIEW_MODE);
  }

  details = rxResource({
    params: () => ({ userId: this.userId }),
    stream: (resource) => 
      this.curriculumService.getProfessionalDetailByUserId(resource.params.userId)
        .pipe(
          tap(response => this.handleSuccess(response)),
        ),
  });
    
  handleSuccess(response: Result<ProfessionalDetailResponse>) {
    this.detailId.set(response.result!.id || '');
    this.experiences.set(response.result!.experiences || []);
  }
}
