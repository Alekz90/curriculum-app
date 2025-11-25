import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialCardModule } from '@app/modules/material-card.module';
import { Constants } from '@app/utils/constants';
import { ConstantsRoutes } from '@app/utils/route-constants';

@Component({
  selector: 'profile-image',
  imports: [MaterialCardModule],
  templateUrl: './profile-image.component.html',
})
export class ProfileImageComponent {
  
  protected readonly VIEW_MODE     = Constants.VIEW_MODE;
  protected readonly IMAGE_FORM    = Constants.IMAGE_FORM;

  private router            = inject(Router);

  viewType  = signal<string>(Constants.VIEW_MODE);

  ngOnInit(): void {
    this.router.url.includes(ConstantsRoutes.imageForm.pathLink)
          ? this.viewType.set(Constants.FORM_MODE)
          : this.viewType.set(Constants.VIEW_MODE);
  }
}
