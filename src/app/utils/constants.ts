import { ConfirmDialogData } from "@app/interfaces/confirm-dialog-data";
import { EducationLevelEnum, LanguageLevelEnum } from "./enum";

export class Constants {
  static readonly APP_NAME = 'Curriculum App';
  static readonly SUPPORT_EMAIL = 'support@curriculumapp.com';
  static readonly TERMS_OF_SERVICE_URL = 'https://www.curriculumapp.com/terms';
  static readonly PRIVACY_POLICY_URL = 'https://www.curriculumapp.com/privacy';
  static readonly V1_PATH = "/v1";
  static readonly ID_SUCCESS = "0";
  static readonly MESSAGE_SUCCESS = "Success process";
  static readonly ID_ERROR = "1";
  static readonly PROFESSIONAL_DETAIL_NOT_FOUND_ID = '0017';
  static readonly TOKEN = "token";
  static readonly PATH_NEW = "new";
  static readonly EMPTY_STRING_DATE = '1/1/1900';
  static readonly EMPTY_DATE = new Date(Constants.EMPTY_STRING_DATE);


  static readonly CONFIRM_DIALOG_WIDTH = '450px';
  static readonly PASSWORD_MIN_LENGTH = 10;
  static readonly PASSWORD_MAX_LENGTH = 100;
  static readonly USERNAME_MIN_LENGTH = 2;
  static readonly USERNAME_PATTERN = "^[a-zA-Z@$!%*¿?&.\\-_\\d ]{1,100}$";
  static readonly PHONE_CODE_PATTERN = "^\\+\\d{1,3}$";
  static readonly PHONE_PATTERN = "^\\d{10}$";
  static readonly NAME_TEXT_PATTERN = "^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]+$";
  static readonly TITLE_TEXT_PATTERN = "^[a-zA-ZñáéíóúüÑÁÉÍÓÚÜ!-/:;=-@\\|¿?ªº\\d ]+$";
  static readonly SPECIAL_TEXT_PATTERN = "^[a-zA-ZñáéíóúüÑÁÉÍÓÚÜ!-/:-@Z-_{-}ªº¿¡\\d ]+$";
  static readonly IDENTIFIER_PATTERN = "^[a-fA-F0-9]{24}$";
  static readonly EMAIL_PATTERN = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
  static readonly PASSWORD_SPECIAL_PATTERN = "@$¡!%*¿?&\\-+=.#";
  static readonly PASSWORD_PATTERN = 
    `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[${Constants.PASSWORD_SPECIAL_PATTERN}])[A-Za-z\\d${Constants.PASSWORD_SPECIAL_PATTERN} ]{${Constants.PASSWORD_MIN_LENGTH},${Constants.PASSWORD_MAX_LENGTH}}$`;
  static readonly PATTERN_PASSWORD_MESSAGE = `Mínimo ${Constants.PASSWORD_MIN_LENGTH} caracteres, una mayúscula, una minúscula, un número, un carácter especial ${Constants.PASSWORD_SPECIAL_PATTERN}`;

  static readonly IGNORE_ERRORS_LIST = [
    '0014', // Profile not found
  ];

  static readonly DASHBOARD_MODE = 'DASHBOARD_MODE';
  static readonly VIEW_MODE      = 'VIEW_MODE';
  static readonly HIDDEN_MODE    = 'HIDDEN_MODE';
  static readonly FORM_MODE      = 'FORM_MODE';
  
  static readonly PROFILE_FORM  = 'PROFILE_FORM';
  static readonly IMAGE_FORM    = 'IMAGE_FORM';
  static readonly PASSWORD_FORM = 'PASSWORD_FORM';
  static readonly ADDRESS_FORM  = 'ADDRESS_FORM';

  static readonly LANGUAGE_LEVEL_ENUM = Object.entries(LanguageLevelEnum).map(([key, value]) => ({key: key, value: value}));
  static readonly EDUCATION_LEVEL_ENUM = Object.entries(EducationLevelEnum).map(([key, value]) => ({key: key, value: value}));

  static readonly CANCEL_DIALOG_DATA: ConfirmDialogData = {
    title: 'Cancelar operación',
    message: 'Si continua perderá los cambios realizados. ¿Deseas continuar?',
    confirmText: 'Sí',
    cancelText: 'No',
    iconCancel: 'cancel',
    iconConfirm: 'warning',
    type: 'warning'
  };
  
  static readonly DELETE_DIALOG_DATA: ConfirmDialogData = {
    title: 'Eliminar información',
    message: 'Al continuar se eliminará la información del elemento seleccionado y no podrá recuperarse. ¿Deseas continuar?',
    confirmText: 'Sí',
    cancelText: 'No',
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
