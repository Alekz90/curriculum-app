import { Component } from '@angular/core';
import { MaterialCardModule } from '@app/modules/material-card.module';

@Component({
  selector: 'password-card',
  imports: [MaterialCardModule],
  templateUrl: './password-card.component.html',
})
export class PasswordCardComponent { }
