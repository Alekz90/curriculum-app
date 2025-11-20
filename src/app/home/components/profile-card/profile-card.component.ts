import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { User } from '@app/interfaces/user.interface';
import { ProfileResponse } from '@interfaces/profile.interface';
import { MaterialCardModule } from '@modules/material-card.module';

@Component({
  selector: 'profile-card',
  imports: [MaterialCardModule, DatePipe],
  templateUrl: './profile-card.component.html',
})
export class ProfileCardComponent {  
  profile = input.required<ProfileResponse>();
  user = input.required<User>();
}
