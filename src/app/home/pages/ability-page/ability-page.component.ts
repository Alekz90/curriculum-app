import { Component, inject } from '@angular/core';
import { CurriculumService } from '@services/curriculum.service';
import { AbilityCardComponent } from "@home/components/ability-card/ability-card.component";

@Component({
  selector: 'ability-page',
  imports: [AbilityCardComponent],
  templateUrl: './ability-page.component.html',
})
export class AbilityPageComponent {
  service = inject(CurriculumService);
  abilities = this.service.abilityGroups;
}
