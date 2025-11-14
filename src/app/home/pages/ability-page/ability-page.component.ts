import { Component, inject, signal } from '@angular/core';
import { CurriculumService } from '@services/curriculum.service';
import { AbilityCardComponent } from "@home/components/ability-card/ability-card.component";
import { Constants } from '@app/utils/constants';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'ability-page',
  imports: [AbilityCardComponent],
  templateUrl: './ability-page.component.html',
})
export class AbilityPageComponent {
  service = inject(CurriculumService);
  abilities = this.service.abilityGroups;
  viewType = signal<string>(Constants.EDITION);
  router = inject(Router);

  ngOnInit(): void {
    this.router.url.includes(ConstantsRoutes.abilityForm.pathLink) 
      ? this.viewType.set(Constants.FORM)
      : this.viewType.set(Constants.EDITION);    
  }
}
