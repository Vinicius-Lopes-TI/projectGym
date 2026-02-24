export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  fullName: string;
  userName: string;
  listOfProfiles: number[];
}
