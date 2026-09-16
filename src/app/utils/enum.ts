export enum EducationLevelEnum {
  PRIMARY           = "Primaria",
  SECONDARY         = "Secundaria",
  HIGH_SCHOOL       = "Bachillerato",
  ASSOCIATE_DEGREE  = "Técnico Superior",
  UNIVERSITY_DEGREE = "Ingeniería / Licenciatura",
  MASTER_DEGREE     = "Maestría",
  DOCTORATE         = "Doctorado",
}

export enum LanguageLevelEnum {
  BASIC         = "Básico",
  INTERMEDIATE  = "Intermedio",
  ADVANCED      = "Avanzado",
  NATIVE        = "Nativo",
}

export enum RoleEnum {
  ADMIN,
  USER
}

export enum AuthenticationStatusEnum {
  CHECKING = "checking",
  AUTHENTICATED = "authenticated",
  NOT_AUTHENTICATED = "not_authenticated"
}
