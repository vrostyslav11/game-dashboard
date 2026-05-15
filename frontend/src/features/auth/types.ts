/** Matches backend `Role` enum — use exact casing. */
export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}
