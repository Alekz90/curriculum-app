import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProfileResponse } from '@app/interfaces/profile.interface';
import { AbilityGroupResponse, AbilityResponse } from '@interfaces/ability.interface';
import { AddressResponse } from '@interfaces/address.interface';
import { CertificationResponse } from '@interfaces/certification.interface';
import { EducationResponse } from '@interfaces/education.interface';
import { ExperienceResponse } from '@interfaces/experience.interface';
import { LanguageResponse } from '@interfaces/language.interface';
import { LinkResponse } from '@interfaces/link.interface';
import { ProfessionalDetailResponse } from '@interfaces/professional-detail.interface';
import { EducationLevelEnum, LanguageLevelEnum } from '@utils/enum';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  httpClient = inject(HttpClient);

  profile: ProfileResponse = {
    id: 'idProfile',
    userId: 'userIdProfile',
    birthDate: new Date('1995-06-15'),
    codePhone: '+52',
    cellphone: '8112345678',
    image: 'https://example.com/images/alejandro-del-angel.jpg',
    fullName: 'Alejandro Del Ángel',
  };

  user = {
    id: 'userId',
    email: 'alejandro.delangel@example.com',
    username: 'adelangel'
  };

  address1: AddressResponse = {
    id: 'idAddress1',
    city: 'San Pedro Garza García',
    state: 'Nuevo León',
    country: 'México',
    showInCurriculum: true
  };

  address2: AddressResponse = {
    id: 'idAddress2',
    city: 'Monterrey',
    state: 'Nuevo León',
    country: 'México',
    showInCurriculum: true
  };

  experiences: ExperienceResponse[] = [{
    id: 'idExperience1',
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
    location: this.address1
    }, {
      id: 'idExperience2',
      company: 'Innovatech Solutions',
      position: 'Desarrollador Backend',
      startDate: new Date('2018-05-01'),
      endDate: new Date('2021-07-31'),
      stillWorking: false,
      activities: '• Diseñé e implementé APIs RESTful con Spring Boot para gestión de inventarios y ventas. \n' +
        '• Optimicé consultas SQL, mejorando el rendimiento de la base de datos en un 30%. \n' +
        '• Colaboré en la migración de una aplicación monolítica a una arquitectura de microservicios. \n' +
        '• Implementé autenticación y autorización utilizando Spring Security y JWT. \n' +
        '• Participé en revisiones de código y aseguramiento de calidad mediante pruebas unitarias con JUnit.',
      location: this.address2
    }];

  languages: LanguageResponse[] = [{
    id: 'idLanguage1',
    name: 'Español',
    level: LanguageLevelEnum.NATIVE,
  },
  {
    id: 'idLanguage2',
    name: 'Inglés',
    level: LanguageLevelEnum.INTERMEDIATE,
  }];

  ability1: AbilityResponse[] = [
    { id: 'idAbility1', name: 'Angular', percentage: 40 },
    { id: 'idAbility2', name: 'React', percentage: 30 },
    { id: 'idAbility3', name: 'Vue.js', percentage: 20 },
    { id: 'idAbility4', name: 'HTML5', percentage: 50 },
    { id: 'idAbility5', name: 'CSS3', percentage: 40 },
    { id: 'idAbility6', name: 'TypeScript', percentage: 40 }
  ];

  ability2: AbilityResponse[] = [
    { id: 'idAbility7', name: 'Java', percentage: 50 },
    { id: 'idAbility8', name: 'Spring Boot', percentage: 40 },
    { id: 'idAbility9', name: 'Node.js', percentage: 30 },
    { id: 'idAbility10', name: 'Express', percentage: 20 },
    { id: 'idAbility11', name: 'Python', percentage: 30 },
    { id: 'idAbility12', name: 'Django', percentage: 20 }
  ];

  ability3: AbilityResponse[] = [
    { id: 'idAbility13', name: 'MySQL', percentage: 40 },
    { id: 'idAbility14', name: 'PostgreSQL', percentage: 30 },
    { id: 'idAbility15', name: 'MongoDB', percentage: 20 },
    { id: 'idAbility16', name: 'Redis', percentage: 20 },
    { id: 'idAbility17', name: 'Oracle', percentage: 10 }
  ];

  ability4: AbilityResponse[] = [
    { id: 'idAbility18', name: 'Docker', percentage: 30 },
    { id: 'idAbility19', name: 'Kubernetes', percentage: 20 },
    { id: 'idAbility20', name: 'Jenkins', percentage: 20 },
    { id: 'idAbility21', name: 'GitLab CI/CD', percentage: 20 },
    { id: 'idAbility22', name: 'AWS', percentage: 10 },
    { id: 'idAbility23', name: 'Azure', percentage: 10 }
  ];

  abilityGroups: AbilityGroupResponse[] = [
    {
      id: 'idAbilityGroup1',
      name: 'Frontend',
      abilities: this.ability1,
    },
    {
      id: 'idAbilityGroup2',
      name: 'Backend',
      abilities: this.ability2,
    },
    {
      id: 'idAbilityGroup3',
      name: 'Bases de Datos',
      abilities: this.ability3,
    },
    {
      id: 'idAbilityGroup4',
      name: 'DevOps',
      abilities: this.ability4,
    }
  ];

  educations: EducationResponse[] = [{
    id: 'idEducation1',
    level: EducationLevelEnum.UNIVERSITY_DEGREE,
    institute: 'Instituto Tecnológico y de Estudios Superiores de Monterrey',
    degree: 'Ingeniería en Sistemas Computacionales',
    startYear: 2013,
    endYear: 2017,
    stillStudying: false,
  }, {
    id: 'idEducation2',
    level: EducationLevelEnum.MASTER_DEGREE,
    institute: 'Universidad Nacional Autónoma de México',
    degree: 'Maestría en Ciencias de la Computación',
    startYear: 2018,
    endYear: null,
    stillStudying: true,
  }];

  certifications: CertificationResponse[] = [{
    id: 'idCertification1',
    name: 'Certified Java Developer',
    description: 'Certificación que valida las habilidades avanzadas en desarrollo con Java y tecnologías relacionadas.'
  }, {
    id: 'idCertification2',
    name: 'AWS Solutions Architect',
    description: 'Certificación que demuestra la capacidad para diseñar y desplegar aplicaciones en la plataforma AWS.'
  }, {
    id: 'idCertification3',
    name: 'Scrum Master Certified (SMC)',
    description: 'Certificación que acredita el conocimiento y la experiencia en la metodología ágil Scrum.'
  }, {
    id: 'idCertification4',
    name: 'Certified Kubernetes Administrator (CKA)',
    description: 'Certificación que valida las habilidades en la administración y operación de clústeres Kubernetes.'
  }];

  links: LinkResponse[] = [
    {
      id: 'idLink1',
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/alejandro-del-angel/'
    },
    {
      id: 'idLink2',
      name: 'GitHub',
      url: 'https://github.com/alejandro-del-angel'
    },
    {
      id: 'idLink3',
      name: 'Portfolio',
      url: 'https://alejandro-del-angel.dev'
    }
  ];
  
  detail: ProfessionalDetailResponse = {
    id: 'idDetail1',
    userId: 'userIdDetail1',
    position: 'Programador Full Stack Java | Angular',
    summary: 'Programador Full Stack con 7 años experiencia en desarrollo de plataformas basadas en ' +
      'microservicios (RESTful) y monolíticas, implementando tecnologías como Spring Boot, ' +
      'Spring Security (JWT), Spring Data (JPA, Hibernate), Spring Cloud, SQL, NoSQL y Cache. ' +
      'Desde la creación hasta la integración y despliegue en entornos Kubernetes (OpenShift, ' +
      'Docker), utilizando patrones de diseño (GoF), principios SOLID, seguridad web (OWASP), ' +
      'análisis de código (SonarQube) y optimización con IA (Copilot).\n\n Apasionado por seguir ' +
      'aprendiendo y reforzando conocimientos en tecnologías emergentes para el desarrollo de ' +
      'aplicaciones.',
    experiences:    this.experiences,
    languages:      this.languages,
    abilityGroups:  this.abilityGroups,
    educations:     this.educations,
    certifications: this.certifications,
    links:          this.links,
    address:        this.address1,
  };
}
