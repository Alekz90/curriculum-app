import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';
import { MaterialModule } from '@modules/material.module';
import { ALL_ROUTES, ConstantsRoutes } from '@utils/route-constants';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'home-page',
  imports: [RouterOutlet, MaterialModule, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements AfterViewInit {
  //@ViewChild('drawer') drawer!: MatDrawer;

  private _router = inject<Router>(Router);
  private _authService = inject(AuthenticationService);
  
  title = signal<string>('Curriculum App');
  protected user = this._authService.user();

  menuItems: MenuItem[] = [
    { icon: 'book', label: ConstantsRoutes.dashboard.title, route: ConstantsRoutes.dashboard.pathLink },
    { icon: 'format_align_justify', label: ConstantsRoutes.summaries.title, route: ConstantsRoutes.summaries.pathLink },
    { icon: 'work', label: ConstantsRoutes.experiences.title, route: ConstantsRoutes.experiences.pathLink },
    { icon: 'language', label: ConstantsRoutes.languages.title, route: ConstantsRoutes.languages.pathLink },
    { icon: 'verified', label: ConstantsRoutes.abilities.title, route: ConstantsRoutes.abilities.pathLink },
    { icon: 'school', label: ConstantsRoutes.educations.title, route: ConstantsRoutes.educations.pathLink },
    { icon: 'workspace_premium', label: ConstantsRoutes.certifications.title, route: ConstantsRoutes.certifications.pathLink },
    { icon: 'link', label: ConstantsRoutes.links.title, route: ConstantsRoutes.links.pathLink },
    { icon: 'file_open', label: ConstantsRoutes.templates.title, route: ConstantsRoutes.templates.pathLink },
    //{ icon: 'settings', label: ConstantsRoutes.settings.title, route: ConstantsRoutes.settings.pathLink },
    { icon: 'help', label: ConstantsRoutes.help.title, route: ConstantsRoutes.help.pathLink }    
  ];

  ngAfterViewInit() {
    this.title.set(this.getTitleHomePage());
  }

  goToLogout() {
    this._authService.logout();
    this._router.navigate([ConstantsRoutes.login.pathLink]);
  }
  
  goToProfile() {
    this.title.set(ConstantsRoutes.profile.title);
    this._router.navigate([ConstantsRoutes.profile.pathLink]);
  }

  getTitleHomePage(): string {
    const currentRoute = this._router.url;
    const menuItem = ALL_ROUTES.find(item => item.pathLink === currentRoute);
    return menuItem ? menuItem.title : 'Curriculum App';
  }
}
