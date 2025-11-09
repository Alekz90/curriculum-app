import { Component, input } from '@angular/core';
import { LanguageResponse } from '@app/interface/language.interface';
import { MaterialModule } from '@app/material.module';

@Component({
  selector: 'language-card',
  imports: [MaterialModule],
  templateUrl: './language-card.component.html',
})
export class LanguageCardComponent {  
  language = input.required<LanguageResponse>();
  showActions = input<boolean>(false);

  languageComputed(): string {
    return `• ${this.language().name} (${this.language().level})`;
  };
}
