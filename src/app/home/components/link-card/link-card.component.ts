import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsRoutes } from '@app/utils/constants';
import { LinkResponse } from '@interfaces/link.interface';
import { MaterialCardModule } from '@modules/material-card.module';

@Component({
  selector: 'link-card',
  imports: [MaterialCardModule],
  templateUrl: './link-card.component.html',
})
export class LinkCardComponent {
  links = input.required<LinkResponse[]>();
  isEdition = input<boolean>(false);
  editEnabled = input<boolean>(false);
  deleteEnabled = input<boolean>(false);

  router = inject(Router);

  goToEditMode(): void {
    console.log('Edit mode activated');
    this.router.navigate([ConstantsRoutes.LINKS.pathLink]);
  }
}
