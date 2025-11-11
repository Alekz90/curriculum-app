import { Component, inject, input } from '@angular/core';
import { CertificationResponse } from '@interfaces/certification.interface';
import { MaterialCardModule } from '@modules/material-card.module';
import { Router } from '@angular/router';
import { ConstantsRoutes } from '@app/utils/constants';

@Component({
  selector: 'certification-card',
  imports: [MaterialCardModule],
  templateUrl: './certification-card.component.html',
})
export class CertificationCardComponent {
  certifications = input.required<CertificationResponse[]>();
  isEdition = input<boolean>(false);
  editEnabled = input<boolean>(false);
  deleteEnabled = input<boolean>(false);
 
  router = inject(Router);
  
  goToEditMode(): void {
    console.log('Edit mode activated');
    this.router.navigate([ConstantsRoutes.CERTIFICATIONS.pathLink]);
  }
}
