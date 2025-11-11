import { Component, inject } from '@angular/core';
import { LinkCardComponent } from '@home/components/link-card/link-card.component';
import { CurriculumService } from '@services/curriculum.service';

@Component({
  selector: 'link-page',
  imports: [LinkCardComponent],
  templateUrl: './link-page.component.html',
})
export class LinkPageComponent {
  service = inject(CurriculumService);
  links = this.service.links;
}