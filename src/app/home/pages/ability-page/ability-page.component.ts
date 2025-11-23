import { Component, inject, signal } from '@angular/core';
import { CurriculumService } from '@services/curriculum.service';
import { AbilityCardComponent } from "@home/components/ability-card/ability-card.component";
import { Constants } from '@app/utils/constants';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { Router } from '@angular/router';
import { ProfessionalDetailResponse } from '@app/interfaces/professional-detail.interface';
import { Result } from '@app/interfaces/result.interface';
import { tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthenticationService } from '@app/services/authentication.service';
import { NavigationUtils } from '@app/utils/navigation-utils';
import { AbilityGroupResponse, AbilityResponse } from '@app/interfaces/ability.interface';

@Component({
  selector: 'ability-page',
  imports: [AbilityCardComponent],
  templateUrl: './ability-page.component.html',
})
export class AbilityPageComponent {
  
  private userId            = inject(AuthenticationService).userId();
  private curriculumService = inject(CurriculumService);
  private router            = inject(Router);
  protected navigation      = inject(NavigationUtils);
  
  detailId  = signal<string>('');
  abilities = signal<AbilityGroupResponse[]>([]);
  viewType  = signal<string>(Constants.EDITION);

  ngOnInit(): void {
    this.router.url.includes(ConstantsRoutes.abilityForm.pathLink) 
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
    this.abilities.set(response.result!.abilityGroups || []);
  }
}
