import { AddressResponse } from "@interface/address.interface";

export interface ExperienceRequest {
  company:      string;
  position:     string;
  startDate:    Date;
  endDate:      Date;
  stillWorking: boolean;
  activities:   string;
  location:     AddressResponse;
}

export interface ExperienceResponse extends ExperienceRequest {
  id:           string;
}
