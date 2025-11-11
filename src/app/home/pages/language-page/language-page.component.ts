import { Component, inject } from '@angular/core';
import { LanguageCardComponent } from '@home/components/language-card/language-card.component';
import { CurriculumService } from '@services/curriculum.service';

@Component({
  selector: 'language-page',
  imports: [LanguageCardComponent],
  templateUrl: './language-page.component.html',
})
export class LanguagePageComponent {
  service = inject(CurriculumService);
  languages = this.service.languages;
}
