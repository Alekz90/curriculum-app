import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsRoutes } from '@app/utils/constants';
import { AddressResponse } from '@interfaces/address.interface';
import { MaterialCardModule } from '@modules/material-card.module';

@Component({
  selector: 'location-card',
  imports: [MaterialCardModule],
  templateUrl: './location-card.component.html',
})
export class LocationCardComponent {
  location = input.required<AddressResponse>();
  isEdition = input<boolean>(false);
  editEnabled = input<boolean>(false);
  deleteEnabled = input<boolean>(false);

  router = inject(Router);

  goToEditMode(): void {
    console.log('Edit mode activated');
    this.router.navigate([ConstantsRoutes.LOCATION.pathLink]);
  }
}
