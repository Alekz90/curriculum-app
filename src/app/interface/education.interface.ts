import { EducationLevelEnum } from "@utils/enum";

export interface EducationRequest {
  level:         EducationLevelEnum;
  institute:     string;
  degree:        string;
  startDate:     string;
  endDate:       string;
  stillStudying: boolean;
}

export interface EducationResponse extends EducationRequest {
  id:            string;
}
