import { Component } from '@angular/core';
import { MaterialModule } from '@app/material.module';
import { SummaryCardComponent } from "@app/home/components/summary-card/summary-card.component";
import { ProfessionalDetailResponse } from '@interface/professional-detail.interface';
import { ExperienceResponse } from '@interface/experience.interface';
import { AddressResponse } from '@interface/address.interface';
import { ExperienceCardComponent } from '@app/home/components/experience-card/experience-card.component';
import { LanguageResponse } from '@app/interface/language.interface';
import { LanguageLevelEnum } from '@app/utils/enum';
import { LanguageCardComponent } from "@app/home/components/language-card/language-card.component";

@Component({
  selector: 'dashboard-page',
  imports: [MaterialModule,
    SummaryCardComponent,
    ExperienceCardComponent, LanguageCardComponent],
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent {
  detail: ProfessionalDetailResponse = {
    id: 'id',
    userId: 'userId',
    position: 'Programador Full Stack Java | Angular',
    summary: 'Programador Full Stack con 7 años experiencia en desarrollo de plataformas basadas en ' +
      'microservicios (RESTful) y monolíticas, implementando tecnologías como Spring Boot, ' +
      'Spring Security (JWT), Spring Data (JPA, Hibernate), Spring Cloud, SQL, NoSQL y Cache. ' +
      'Desde la creación hasta la integración y despliegue en entornos Kubernetes (OpenShift, ' +
      'Docker), utilizando patrones de diseño (GoF), principios SOLID, seguridad web (OWASP), ' +
      'análisis de código (SonarQube) y optimización con IA (Copilot). Apasionado por seguir ' +
      'aprendiendo y reforzando conocimientos en tecnologías emergentes para el desarrollo de ' +
      'aplicaciones.'
  };

  address: AddressResponse = {
      id: 'id',
      city: 'San Pedro Garza García',
      state: 'Nuevo León',
      country: 'México',
      showInCurriculum: true
    };

  experience: ExperienceResponse = {
    id: 'id',
    company: 'Tech Solutions S.A.',
    position: 'Programador Full-Stack',
    startDate: new Date('2021-08-01'),
    endDate: new Date('2024-10-01'),
    stillWorking: true,
    activities: '•	Lideré el desarrollo de un sistema de mensajería SWIFT con Java Spring Boot, completado ' +
      'en solo el 85% del tiempo estimado. \n' +
      '•	Construí microservicios para aclaraciones bancarias (tarjetas, retiros, transferencias, cheques, CONDUSEF). \n' +
      '•	Desarrollé interfaces para firma de contrato y validación de buró de crédito usando Angular y Spring Boot. \n' +
      '•	Migré una app móvil de Xamarin a Flutter para venta de calzado, mejorando rendimiento. \n' +
      '•	Implementé un microservicio para migración de usuarios desde Excel a Core Bancario con validaciones.',
    location: this.address
  };

  language: LanguageResponse = {
    id: 'id',
    name: 'Inglés',
    level: LanguageLevelEnum.INTERMEDIATE,
  };
}
