

export interface AbilityGroupRequest {
  name: string;
}

export interface AbilityGroupResponse extends AbilityGroupRequest {  
  id: string;
  abilities: AbilityResponse[];
}

export interface AbilityRequest {
  name:    string;
  percentage: number;
}

export interface AbilityResponse extends AbilityRequest {  
  id: string;
}