export interface ProfileRequest {
  userId:    string;
  birthDate: Date;
  codePhone: string;
  cellphone: string;
  fullName:  string;
}

export interface ProfileResponse extends ProfileRequest {
  id:        string;
  image:     string;
}