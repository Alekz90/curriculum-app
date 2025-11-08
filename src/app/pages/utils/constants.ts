export class Constants {
  static readonly APP_NAME = 'Curriculum App';
  static readonly SUPPORT_EMAIL = 'support@curriculumapp.com';
  static readonly TERMS_OF_SERVICE_URL = 'https://www.curriculumapp.com/terms';
  static readonly PRIVACY_POLICY_URL = 'https://www.curriculumapp.com/privacy';

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
    title: 'Dashboard'
  };
}

