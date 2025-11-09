export interface ProfessionalDetailRequest {
  userId:   string;
  position: string;
  summary:  string;
}

export interface ProfessionalDetailResponse extends ProfessionalDetailRequest {  
  id:       string;
}

