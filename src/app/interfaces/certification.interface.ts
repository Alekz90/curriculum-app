export interface CertificationRequest{
  name:        string;
  description: string;
}

export interface CertificationResponse extends CertificationRequest {
  id:          string;
}
