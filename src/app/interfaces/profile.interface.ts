import { Constants } from "@utils/constants";
import { AddressEmpty, AddressResponse } from "@interfaces/address.interface";
import { ImageEmpty, ImageResponse } from "@interfaces/image.interface";

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
  image:     ImageResponse;
}

export const ProfileEmpty: ProfileResponse = {
    id: '',
    userId: '',
    fullName: '',
    birthDate: Constants.EMPTY_DATE,
    codePhone: '',
    cellphone: '',
    address: AddressEmpty,
    image: ImageEmpty,
  };