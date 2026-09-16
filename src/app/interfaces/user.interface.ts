import { RoleEnum } from "@app/utils/enum";

export interface User {
  id:        string;
  username:  string;
  email:     string;
  role:      RoleEnum;
  active:    boolean;
  blocked:   boolean;
  verified:  boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterRequest {
  email:        string;
  username:     string;
  password:     string;
  acceptTerms:  boolean;
}

export interface Authentication {
  token: string;
  user:  User;
}

export interface RecoveryPasswordRequest {
  newPassword: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
