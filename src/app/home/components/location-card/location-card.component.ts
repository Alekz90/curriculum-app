import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Constants, ConstantsRoutes } from '@app/utils/constants';
import { AddressResponse } from '@interfaces/address.interface';
import { MaterialCardModule } from '@modules/material-card.module';

@Component({
  selector: 'location-card',
  imports: [MaterialCardModule],
  templateUrl: './location-card.component.html',
})
export class LocationCardComponent {
  readonly DASHBOARD = Constants.DASHBOARD;

  location = input.required<AddressResponse>();
  viewType = input<string>(Constants.DASHBOARD);

  router = inject(Router);

  goToEditMode(): void {
    this.router.navigate([ConstantsRoutes.LOCATION.pathLink]);
  }
}
