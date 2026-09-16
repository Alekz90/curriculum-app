import { EducationLevelEnum } from "@utils/enum";

export interface EducationRequest {
  level:         EducationLevelEnum;
  institute:     string;
  degree:        string;
  startYear:     number;
  endYear:       number | null;
  stillStudying: boolean;
}

export interface EducationResponse extends EducationRequest {
  id:            string;
}
