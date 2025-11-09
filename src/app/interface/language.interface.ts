import { LanguageLevelEnum } from "@utils/enum";

export interface LanguageRequest {
  name:  string;
  level: LanguageLevelEnum;
}

export interface LanguageResponse extends LanguageRequest {  
  id:    string;
}