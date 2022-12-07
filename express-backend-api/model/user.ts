export interface User {
  id: string;
  username: string;
  password: string | null;
  email: string;
  emailToken: string;
  isAdministrator: boolean;
  isEmailVerified: boolean;
}
