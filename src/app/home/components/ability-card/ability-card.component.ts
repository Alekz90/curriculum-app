import { Component, inject, input } from '@angular/core';
import { MaterialCardModule } from '@modules/material-card.module';
import { AbilityGroupResponse, AbilityResponse } from '@interfaces/ability.interface';
import { ConstantsRoutes } from '@app/utils/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'ability-card',
  imports: [MaterialCardModule],
  templateUrl: './ability-card.component.html',
})
export class AbilityCardComponent {
  abilityGroups = input.required<AbilityGroupResponse[]>();
  isEdition = input<boolean>(false);
  editEnabled = input<boolean>(false);
  deleteEnabled = input<boolean>(false);
  
  router = inject(Router);

  getAbilitiesJoinText(abilities: AbilityResponse[]): String {
    return abilities.map(ability => ability.name).join(', ');
  }

  goToEditMode(): void {
    console.log('Edit mode activated');
    this.router.navigate([ConstantsRoutes.ABILITIES.pathLink]);
  }

}
