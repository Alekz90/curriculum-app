import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MaterialModule } from '@modules/material.module';
import { ConstantsRoutes } from '@utils/constants';

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

  router = inject<Router>(Router);
  
  title = signal<string>('Curriculum App');

  menuItems: MenuItem[] = [
    { icon: 'book', label: ConstantsRoutes.DASHBOARD.title, route: ConstantsRoutes.DASHBOARD.pathLink },
    // { icon: 'verified_user', label: 'Verificación', route: ConstantsRoutes.VERIFICATION.pathLink },
    { icon: 'format_align_justify', label: ConstantsRoutes.SUMMARIES.title, route: ConstantsRoutes.SUMMARIES.pathLink },
    { icon: 'location_on', label: ConstantsRoutes.LOCATION.title, route: ConstantsRoutes.LOCATION.pathLink },
    { icon: 'work', label: ConstantsRoutes.EXPERIENCES.title, route: ConstantsRoutes.EXPERIENCES.pathLink },
    { icon: 'language', label: ConstantsRoutes.LANGUAGES.title, route: ConstantsRoutes.LANGUAGES.pathLink },
    { icon: 'verified', label: ConstantsRoutes.ABILITIES.title, route: ConstantsRoutes.ABILITIES.pathLink },
    { icon: 'school', label: ConstantsRoutes.EDUCATIONS.title, route: ConstantsRoutes.EDUCATIONS.pathLink },
    { icon: 'workspace_premium', label: ConstantsRoutes.CERTIFICATIONS.title, route: ConstantsRoutes.CERTIFICATIONS.pathLink },
    { icon: 'link', label: ConstantsRoutes.LINKS.title, route: ConstantsRoutes.LINKS.pathLink },
    { icon: 'file_open', label: ConstantsRoutes.TEMPLATES.title, route: ConstantsRoutes.TEMPLATES.pathLink },
    //{ icon: 'settings', label: ConstantsRoutes.SETTINGS.title, route: ConstantsRoutes.SETTINGS.pathLink },
    { icon: 'help', label: ConstantsRoutes.HELP.title, route: ConstantsRoutes.HELP.pathLink }
    
  ];

  ngAfterViewInit() {
    this.title.set(this.getTitleHomePage());
  }

  goToLogout() {
    // Lógica de cierre de sesión
    console.log('Cierre de sesión');
    // Redirigir a la página de inicio de sesión
    this.router.navigate([ConstantsRoutes.LOGIN.pathLink]);
  }
  
  goToProfile() {
    this.title.set(ConstantsRoutes.PROFILE.title);
    this.router.navigate([ConstantsRoutes.PROFILE.pathLink]);
  }

  getTitleHomePage(): string {
    const currentRoute = this.router.url;
    const menuItem = ConstantsRoutes.ALL_ROUTES.find(item => item.pathLink === currentRoute);
    return menuItem ? menuItem.title : 'Curriculum App';
  }
}
