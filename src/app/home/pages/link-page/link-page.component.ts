import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '@app/utils/constants';
import { ConstantsRoutes } from '@app/utils/route-constants';
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
  viewType = signal<string>(Constants.EDITION);
  router = inject(Router);

  ngOnInit(): void {
    this.router.url.includes(ConstantsRoutes.linkForm.pathLink)
      ? this.viewType.set(Constants.FORM)
      : this.viewType.set(Constants.EDITION);
  }
}