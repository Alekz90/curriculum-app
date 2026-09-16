import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageResponse } from '@app/interfaces/image.interface';
import { MaterialCardModule } from '@app/modules/material-card.module';
import { ProfilesService } from '@app/services/profiles.service';
import { Constants } from '@app/utils/constants';
import { NavigationUtils } from '@app/utils/navigation-utils';
import { ConstantsRoutes } from '@app/utils/route-constants';

@Component({
  selector: 'profile-image',
  imports: [MaterialCardModule],
  templateUrl: './profile-image.component.html',
})
export class ProfileImageComponent {
  
  protected readonly VIEW_MODE     = Constants.VIEW_MODE;
  protected readonly IMAGE_FORM    = Constants.IMAGE_FORM;
  protected readonly HIDDEN_MODE   = Constants.HIDDEN_MODE;

  private activatedRoute    = inject(ActivatedRoute);
  private formBuilder       = inject(FormBuilder);
  private dialog            = inject(MatDialog);
  private profilesService   = inject(ProfilesService);
  protected navigation      = inject(NavigationUtils);

  image = input.required<ImageResponse>();
  profileId = input<string>('');
  viewType  = signal<string>(this.VIEW_MODE);

  imageId = signal(this.navigation.getRouteParam('id'));

}
