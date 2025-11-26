import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { AuthenticationService } from '@app/services/authentication.service';
import { ProfilesService } from '@services/profiles.service';
import { Result } from '@interfaces/result.interface';
import { User } from '@interfaces/user.interface';
import { ProfileEmpty, ProfileResponse } from '@interfaces/profile.interface';
import { Constants } from '@utils/constants';
import { ProfileCardComponent } from '@home-cards/profile-card/profile-card.component';
import { AddressCardComponent } from "@home-cards/address-card/address-card.component";
import { UserCardComponent } from "@home-cards/user-card/user-card.component";
import { PasswordCardComponent } from "@home-cards/password-card/password-card.component";

@Component({
  selector: 'profile-page',
  imports: [ProfileCardComponent, UserCardComponent, AddressCardComponent, PasswordCardComponent],
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {

  private authenticationService = inject(AuthenticationService);
  private profilesService     = inject(ProfilesService);

  profile   = signal<ProfileResponse>(ProfileEmpty);
  user      = signal<User>(this.authenticationService.user()!);
  viewType  = signal<string>(Constants.VIEW_MODE);

  profilesResource = rxResource({
    params: () => ({ userId: this.user().id! }),
    stream: (resource) => 
      this.profilesService.getProfileByUserId(resource.params.userId)
        .pipe(
          tap(response => this.handleSuccess(response)),
        ),
  });

  handleSuccess(response: Result<ProfileResponse>) {
    if (response.result) {
      this.profile.set(response.result!);
    }
  }
}
