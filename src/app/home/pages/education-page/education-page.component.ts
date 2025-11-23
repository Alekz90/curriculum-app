import { Component, inject, OnInit, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { EducationResponse } from '@interfaces/education.interface';
import { ProfessionalDetailResponse } from '@interfaces/professional-detail.interface';
import { Result } from '@interfaces/result.interface';
import { AuthenticationService } from '@services/authentication.service';
import { Constants } from '@utils/constants';
import { NavigationUtils } from '@utils/navigation-utils';
import { ConstantsRoutes } from '@utils/route-constants';
import { EducationCardComponent } from '@home/components/education/education-card.component';
import { CurriculumService } from '@services/curriculum.service';
import { tap } from 'rxjs';

@Component({
  selector: 'education-page',
  imports: [EducationCardComponent],
  templateUrl: './education-page.component.html',
})
export class EducationPageComponent implements OnInit {

  private userId            = inject(AuthenticationService).userId();
  private curriculumService = inject(CurriculumService);
  private router            = inject(Router);
  protected navigation      = inject(NavigationUtils);
  
  detailId  = signal<string>('');
  educations     = signal<EducationResponse[]>([]);
  viewType  = signal<string>(Constants.EDITION);
  
  ngOnInit(): void {
    this.router.url.includes(ConstantsRoutes.educationForm.pathLink)
      ? this.viewType.set(Constants.FORM)
      : this.viewType.set(Constants.EDITION);
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
    this.educations.set(response.result!.educations || []);
  }
}
