import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'roles';

/**
 * Marks a route or controller as restricted to the listed roles.
 * Must be paired with `RolesGuard` (typically alongside `JwtAuthGuard`).
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
