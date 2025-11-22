import { AbilityGroupResponse } from "./ability.interface";
import { AddressResponse } from "./address.interface";
import { CertificationResponse } from "./certification.interface";
import { EducationResponse } from "./education.interface";
import { ExperienceResponse } from "./experience.interface";
import { LanguageResponse } from "./language.interface";
import { LinkResponse } from "./link.interface";
import { SummaryResponse } from "./summary.interface";

export interface ProfessionalDetail {
  userId:          string;
  summary?:         SummaryResponse;
  address?:         AddressResponse;  
  experiences:     ExperienceResponse[];
  languages:       LanguageResponse[];
  abilityGroups:   AbilityGroupResponse[];
  educations:      EducationResponse[]; 
  certifications:  CertificationResponse[];
  links:           LinkResponse[];
}

export interface ProfessionalDetailResponse extends ProfessionalDetail {  
  id:       string;
}

export interface ProfessionalDetailRequest {
  userId:   string;
  position: string;
  summary:  string;
}
