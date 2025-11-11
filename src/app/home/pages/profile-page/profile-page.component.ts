import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '@app/home/components/profile-card/profile-card.component';
import { CurriculumService } from '@app/services/curriculum.service';

@Component({
  selector: 'profile-page',
  imports: [ProfileCardComponent],
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {
  service = inject(CurriculumService);
  profile = this.service.profile;
  user = this.service.user;
}
