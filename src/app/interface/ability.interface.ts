

export interface AbilityGroupRequest {
  name: string;
}

export interface AbilityGroupResponse extends AbilityGroupRequest {  
  id: string;
}

export interface AbilityRequest {
  name:    string;
  percent: number;
}

export interface AbilityResponse extends AbilityRequest {  
  id: string;
}