import { Component, inject, input, signal } from '@angular/core';
import { NavigationUtils } from '@app/utils/navigation-utils';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { User } from '@interfaces/user.interface';
import { MaterialCardModule } from '@modules/material-card.module';
import { Constants } from '@utils/constants';

@Component({
  selector: 'user-card',
  imports: [MaterialCardModule],
  templateUrl: './user-card.component.html',
})
export class UserCardComponent { 
  
  protected readonly VIEW_MODE     = Constants.VIEW_MODE;
  protected readonly HIDDEN_MODE  = Constants.HIDDEN_MODE;
  
  protected navigation      = inject(NavigationUtils);

  user = input.required<User>();
  viewType  = signal<string>(this.VIEW_MODE);

  ngOnChanges(): void {
    this.navigation.includesUrl(ConstantsRoutes.profile.pathLink)
      ? this.viewType.set(this.VIEW_MODE)
      : this.viewType.set(this.HIDDEN_MODE);
  }
}
