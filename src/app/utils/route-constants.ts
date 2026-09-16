export interface RouteDef {
  path : string;
  pathLink : string;
  title : string;
}

export const ConstantsRoutes = {
  //Without Session
  init: {
    path: '',
    pathLink: '',
    title: '' 
  },
  home: {
    path: 'home',
    pathLink: '/home',
    title: 'Bienvenido'
  },
  login: {
    path: 'login',
    pathLink: '/login',
    title: 'Iniciar Sesión' 
  },
  register: {
    path: 'register',
    pathLink: '/register',
    title: 'Registrarse'
  },
  sendingRecovery: {
    path: 'sending-recovery',
    pathLink: '/sending-recovery',
    title: 'Enviando Recuperación'
  },
  resetPassword: {
    path: 'reset-password/:id',
    pathLink: '/reset-password',
    title: 'Restablecer Contraseña'
  },
  verification: {
    path: 'verification/:id',
    pathLink: '/verification',
    title: 'Verificación de cuenta'
  },
  verificationInfo: {
    path: 'verification-info',
    pathLink: '/verification-info',
    title: 'Información de Verificación'
  },
  //With Session
  profile: {
    path: 'profiles',
    pathLink: '/home/profiles',
    title: 'Perfil'
  },
  dashboard: {
    path: 'dashboard',
    pathLink: '/home/dashboard',
    title: 'Curriculum'
  },
  settings: {
    path: 'settings',
    pathLink: '/home/settings',
    title: 'Configuración'
  },
  help: {
    path: 'help',
    pathLink: '/home/help',
    title: 'Ayuda'
  },
  location: {
    path: 'locations',
    pathLink: '/home/locations',
    title: 'Ubicación'
  },
  summaries: {
    path: 'summaries',
    pathLink: '/home/summaries',
    title: 'Resumen profesional'
  },
  experiences: {
    path: 'experiences',
    pathLink: '/home/experiences',
    title: 'Experiencia profesional'
  },
  languages: {
    path: 'languages',
    pathLink: '/home/languages',
    title: 'Idiomas'
  },
  abilities: {
    path: 'abilities',
    pathLink: '/home/abilities',
    title: 'Habilidades'
  },
  educations: {
    path: 'educations',
    pathLink: '/home/educations',
    title: 'Educación'
  },
  certifications: {
    path: 'certifications',
    pathLink: '/home/certifications',
    title: 'Certificaciones'
  },
  links: {
    path: 'links',
    pathLink: '/home/links',
    title: 'Enlaces'
  },
  templates: {
    path: 'templates',
    pathLink: '/home/templates',
    title: 'Plantillas'
  },
  //Forms
  profileForm: {
    path: 'edit-profile/:id',
    pathLink: '/home/edit-profile',
    title: 'Perfil'
  },
  imageForm: {
    path: 'edit-image-profile/:id',
    pathLink: '/home/edit-image-profile',
    title: 'Perfil'
  },
  addressForm: {
    path: 'edit-address/:id',
    pathLink: '/home/edit-address',
    title: 'Perfil'
  },
  passwordForm: {
    path: 'edit-password/:id',
    pathLink: '/home/edit-password',
    title: 'Perfil'
  },
  summaryForm: {
    path: 'edit-summary/:id',
    pathLink: '/home/edit-summary',
    title: 'Actualizar Resumen'
  },
  experienceForm: {
    path: 'edit-experience/:id',
    pathLink: '/home/edit-experience',
    title: 'Actualizar Experiencia'
  },
  languageForm: {
    path: 'edit-language/:id',
    pathLink: '/home/edit-language',
    title: 'Actualizar Idioma'
  },
  abilityForm: {
    path: 'edit-group-ability/:id',
    pathLink: '/home/edit-group-ability',
    title: 'Actualizar hablilidades'
  },
  educationForm: {
    path: 'edit-education/:id',
    pathLink: '/home/edit-education',
    title: 'Actualizar Educación'
  },
  certificationForm: {
    path: 'edit-certification/:id',
    pathLink: '/home/edit-certification',
    title: 'Actualizar Certificación'
  },
  linkForm: {
    path: 'edit-link/:id',
    pathLink: '/home/edit-link',
    title: 'Actualizar Enlace'
  },
  templateForm: {
    path: 'edit-template',
    pathLink: '/home/edit-template',
    title: 'Actualizar Plantilla'
  }
}

export const ALL_ROUTES = [
  //With Session
  ConstantsRoutes.home,
  ConstantsRoutes.dashboard,
  ConstantsRoutes.profile,
  ConstantsRoutes.settings,
  ConstantsRoutes.help,
  ConstantsRoutes.location,
  ConstantsRoutes.summaries,
  ConstantsRoutes.experiences,
  ConstantsRoutes.languages,
  ConstantsRoutes.abilities,
  ConstantsRoutes.educations,
  ConstantsRoutes.certifications,
  ConstantsRoutes.links,
  ConstantsRoutes.templates,
  //Forms
  ConstantsRoutes.summaryForm,
  ConstantsRoutes.experienceForm,
  ConstantsRoutes.languageForm,
  ConstantsRoutes.abilityForm,
  ConstantsRoutes.educationForm,
  ConstantsRoutes.certificationForm,
  ConstantsRoutes.linkForm,
  ConstantsRoutes.templateForm

];