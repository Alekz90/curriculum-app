import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dashboard-page',
  imports: [MaterialModule],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent { }
