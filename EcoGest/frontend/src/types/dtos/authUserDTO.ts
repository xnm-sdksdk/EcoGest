export interface AuthUser {
  id: number;
  name: string;
  email: string;
  profile: string;
}

export interface AuthUserResponse {
  token: string;
  user: AuthUser;
}
