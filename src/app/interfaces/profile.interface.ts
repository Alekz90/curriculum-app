import { Constants } from "@utils/constants";
import { AddressEmpty, AddressResponse } from "@interfaces/address.interface";

export interface ProfileRequest {
  birthDate: Date;
  codePhone: string;
  cellphone: string;
  fullName:  string;
}

export interface ProfileResponse extends ProfileRequest {
  id:        string;
  userId:    string;
  address:   AddressResponse;
}

export const ProfileEmpty: ProfileResponse = {
    id: '',
    userId: '',
    fullName: '',
    birthDate: Constants.EMPTY_DATE,
    codePhone: '',
    cellphone: '',
    address: AddressEmpty,
  };