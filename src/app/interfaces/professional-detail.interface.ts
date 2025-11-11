import { AbilityGroupResponse } from "./ability.interface";
import { AddressResponse } from "./address.interface";
import { CertificationResponse } from "./certification.interface";
import { EducationResponse } from "./education.interface";
import { ExperienceResponse } from "./experience.interface";
import { LanguageResponse } from "./language.interface";
import { LinkResponse } from "./link.interface";

export interface ProfessionalDetailRequest {
  userId:   string;
  position: string;
  summary:  string;
  experiences: ExperienceResponse[];
  languages:               LanguageResponse[];
  abilityGroups:           AbilityGroupResponse[];
  educations:              EducationResponse[]; 
  certifications:          CertificationResponse[];
  links:                   LinkResponse[];
  address:                 AddressResponse;  
}

export interface ProfessionalDetailResponse extends ProfessionalDetailRequest {  
  id:       string;
}

