import { Role, User } from '@prisma/client';

/**
 * Safe user shape returned by services and attached to authenticated requests.
 * Never contains `passwordHash`.
 */
export interface AuthenticatedUser {
  id: string;
  email: string;
  username: string;
  role: Role;
}

export function toAuthenticatedUser(user: User): AuthenticatedUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
}
