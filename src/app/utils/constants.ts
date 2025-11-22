import { ConfirmDialogData } from "@app/interfaces/confirm-dialog-data";
import { EducationLevelEnum, LanguageLevelEnum } from "./enum";
import { Summary, SummaryResponse } from "@app/interfaces/summary.interface";


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
  
  static readonly DELETE_DIALOG_DATA: ConfirmDialogData = {
    title: '¿Continuar con esta acción?',
    message: 'Al continuar se eliminará el elemento seleccionado. ¿Deseas continuar?',
    confirmText: 'Sí, continuar',
    cancelText: 'No, cancelar',
    iconCancel: 'cancel',
    iconConfirm: 'warning',
    type: 'warning'
  };
  


  static readonly SummaryResponseEmpty: SummaryResponse = {
    id: '',
    position: '',
    summary:  '',
  };
}

export interface RouteDef {
  path : string;
  pathLink : string;
  title : string;
}
