

export interface AbilityGroupRequest {
  name: string;
  abilities: AbilityRequest[];
}

export interface AbilityGroupResponse {  
  id: string;
  name: string;
  abilities: AbilityResponse[];
}

export interface AbilityRequest {
  id?:        string;
  name:       string;
  percentage: number;
}

export interface AbilityResponse {  
  id: string;  
  name:       string;
  percentage: number;
}
