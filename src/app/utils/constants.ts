import { ConfirmDialogData } from "@app/interfaces/confirm-dialog-data";
import { EducationLevelEnum, LanguageLevelEnum } from "./enum";


export class Constants {
  static readonly APP_NAME = 'Curriculum App';
  static readonly SUPPORT_EMAIL = 'support@curriculumapp.com';
  static readonly TERMS_OF_SERVICE_URL = 'https://www.curriculumapp.com/terms';
  static readonly PRIVACY_POLICY_URL = 'https://www.curriculumapp.com/privacy';
  static readonly V1_PATH = "/v1";
  static readonly ID_SUCCESS = "0";
  static readonly ID_ERROR = "1";
  static readonly TOKEN = "token";

  static readonly CONFIRM_DIALOG_WIDTH = '450px';
  static readonly PASSWORD_MIN_LENGTH = 8;
  static readonly USERNAME_MIN_LENGTH = 2;
  static readonly USERNAME_PATTERN = "^[a-zA-Z@$!%*¿?&.\\-_\\d ]{1,100}$";
  static readonly PHONE_CODE_PATTERN = "^+(\\d){4}$";
  static readonly PHONE_PATTERN = "^\\d{10}$";
  static readonly NAME_TEXT_PATTERN = "^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]+$";
  static readonly TITLE_TEXT_PATTERN = "^[a-zA-ZñáéíóúüÑÁÉÍÓÚÜ!-/:;=-@\\|¿?ªº\\d ]+$";
  static readonly SPECIAL_TEXT_PATTERN = "^[a-zA-ZñáéíóúüÑÁÉÍÓÚÜ!-/:-@Z-_{-}ªº¿¡\\d ]+$";
  static readonly IDENTIFIER_PATTERN = "^[a-fA-F0-9]{24}$";
  static readonly EMAIL_PATTERN = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
  static readonly PASSWORD_SPECIAL_PATTERN = "@$¡!%*¿?&\\-+=.#";
  static readonly PASSWORD_PATTERN = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[" + Constants.PASSWORD_SPECIAL_PATTERN 
                                   + "])[A-Za-z\\d" + Constants.PASSWORD_SPECIAL_PATTERN + " ]{10,100}$";

  static readonly DASHBOARD = 'DASHBOARD';
  static readonly EDITION = 'EDITION';
  static readonly FORM = 'FORM';

  static readonly LANGUAGE_LEVEL_ENUM = Object.entries(LanguageLevelEnum).map(([key, value]) => ({key: key, value: value}));
  static readonly EDUCATION_LEVEL_ENUM = Object.entries(EducationLevelEnum).map(([key, value]) => ({key: key, value: value}));

  static readonly CANCEL_DIALOG_DATA: ConfirmDialogData = {
    title: '¿Continuar con esta acción?',
    message: 'Si continua perderá los cambios realizados. ¿Deseas continuar?',
    confirmText: 'Sí, continuar',
    cancelText: 'No, cancelar',
    iconCancel: 'cancel',
    iconConfirm: 'warning',
    type: 'warning'
  };
}

export interface RouteDef {
  path : string;
  pathLink : string;
  title : string;
}

export class ConstantsRoutes {

  static readonly INIT: RouteDef = { path: '', pathLink: '', title: '' };
  static readonly HOME: RouteDef = { path: 'home', pathLink: '/home', title: 'Bienvenido' };
  static readonly LOGIN: RouteDef = { path: 'login', pathLink: '/login', title: 'Iniciar Sesión' };
  static readonly REGISTER: RouteDef = { path: 'register', pathLink: '/register', title: 'Registrarse' };
  static readonly SENDING_RECOVERY: RouteDef = {
    path: 'sending-recovery',
    pathLink: '/sending-recovery',
    title: 'Enviando Recuperación'
  };
  static readonly RESET_PASSWORD: RouteDef = {
    path: 'reset-password',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/reset-password`,
    title: 'Restablecer Contraseña'
  };
  static readonly VERIFICATION: RouteDef = {
    path: 'verification/:id',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/verification`,
    title: 'Verificación'
  };
  static readonly DASHBOARD: RouteDef = {
    path: 'dashboard',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/dashboard`,
    title: 'Curriculum'
  };
  static readonly PROFILE: RouteDef = {
    path: 'profiles',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/profiles`,
    title: 'Perfil'
  };
  static readonly SETTINGS: RouteDef = {
    path: 'settings',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/settings`,
    title: 'Configuración'
  };
  static readonly HELP: RouteDef = {
    path: 'help',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/help`,
    title: 'Ayuda'
  };
  static readonly LOCATION: RouteDef = {
    path: 'locations',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/locations`,
    title: 'Ubicación'
  };
  static readonly SUMMARIES: RouteDef = {
    path: 'summaries',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/summaries`,
    title: 'Resumen profesional'
  };
  static readonly EXPERIENCES: RouteDef = {
    path: 'experiences',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/experiences`,
    title: 'Experiencia profesional'
  };
  static readonly LANGUAGES: RouteDef = {
    path: 'languages',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/languages`,
    title: 'Idiomas'
  };
  static readonly ABILITIES: RouteDef = {
    path: 'abilities',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/abilities`,
    title: 'Habilidades'
  };
  static readonly EDUCATIONS: RouteDef = {
    path: 'educations',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/educations`,
    title: 'Educación'
  };
  static readonly CERTIFICATIONS: RouteDef = {
    path: 'certifications',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/certifications`,
    title: 'Certificaciones'
  };
  static readonly LINKS: RouteDef = {
    path: 'links',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/links`,
    title: 'Enlaces'
  };
  static readonly TEMPLATES: RouteDef = {
    path: 'templates',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/templates`,
    title: 'Plantillas'
  };
  static readonly SUMMARY_FORM: RouteDef = {
    path: 'edit-summary',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/edit-summary`,
    title: 'Actualizar Resumen'
  };
  static readonly EXPERIENCE_FORM: RouteDef = {
    path: 'edit-experience',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/edit-experience`,
    title: 'Actualizar Experiencia'
  };
  static readonly LANGUAGE_FORM: RouteDef = {
    path: 'edit-language',
    pathLink: `${ConstantsRoutes.HOME.pathLink}/edit-language`,
    title: 'Actualizar Idioma'
  };
}
