export interface AddressRequest {
  country:          string;
  state:            string;
  city:             string;
  showInCurriculum: boolean;
}

export interface AddressResponse extends AddressRequest {
  id:               string;
}

export const AddressEmpty: AddressResponse = {
  id:               '',
  country:          '',
  state:            '',
  city:             '',
  showInCurriculum: false,
};