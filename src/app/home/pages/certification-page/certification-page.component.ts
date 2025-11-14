import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '@app/utils/constants';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { CertificationCardComponent } from '@home/components/certification-card/certification-card.component';
import { CurriculumService } from '@services/curriculum.service';

@Component({
  selector: 'certification-page',
  imports: [CertificationCardComponent],
  templateUrl: './certification-page.component.html',
})
export class CertificationPageComponent implements OnInit {
  service = inject(CurriculumService);
  certifications = this.service.certifications;
  viewType = signal<string>(Constants.EDITION);
  router = inject(Router);

  ngOnInit(): void {
    this.router.url.includes(ConstantsRoutes.certificationForm.pathLink)
      ? this.viewType.set(Constants.FORM)
      : this.viewType.set(Constants.EDITION);
  }
}