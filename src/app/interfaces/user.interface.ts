export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  email: string;
}

export interface RegisterResponse extends RegisterRequest {  
  id:       string;
}

export interface AuthenticationResponse {
  token: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface UserResponse {
  id:       string;
  username: string;
  email:    string;
}
