import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '@app/utils/constants';
import { ConstantsRoutes } from '@app/utils/route-constants';
import { LanguageCardComponent } from '@home/components/language-card/language-card.component';
import { CurriculumService } from '@services/curriculum.service';

@Component({
  selector: 'language-page',
  imports: [LanguageCardComponent],
  templateUrl: './language-page.component.html',
})
export class LanguagePageComponent implements OnInit {
  viewType = signal<string>(Constants.EDITION);
  service = inject(CurriculumService);
  languages = this.service.languages;
  router = inject(Router);
  
  ngOnInit(): void {
    this.router.url.includes(ConstantsRoutes.languageForm.pathLink)
      ? this.viewType.set(Constants.FORM)
      : this.viewType.set(Constants.EDITION);
  }
}
