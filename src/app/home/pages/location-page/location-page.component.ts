import { Component, inject } from '@angular/core';
import { LocationCardComponent } from '@home/components/location-card/location-card.component';
import { CurriculumService } from '@services/curriculum.service';

@Component({
  selector: 'location-page',
  imports: [LocationCardComponent],
  templateUrl: './location-page.component.html',
})
export class LocationPageComponent { 
  service = inject(CurriculumService);
  location = this.service.detail.address;
}
