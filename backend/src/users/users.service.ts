import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import {
  AuthenticatedUser,
  toAuthenticatedUser,
} from '../common/types/authenticated-user.type';
import { UsersRepository } from './users.repository';

/**
 * Business-facing user lookups.
 *
 * All methods returning `AuthenticatedUser` strip `passwordHash`.
 * The single exception is `findByEmailForAuth` — its name signals intent
 * and it is the only path through which the hash escapes the repository.
 */
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findById(id: string): Promise<AuthenticatedUser | null> {
    const user = await this.usersRepository.findById(id);
    return user ? toAuthenticatedUser(user) : null;
  }

  isEmailTaken(email: string): Promise<boolean> {
    return this.usersRepository
      .findByEmail(email)
      .then((user) => user !== null);
  }

  isUsernameTaken(username: string): Promise<boolean> {
    return this.usersRepository
      .findByUsername(username)
      .then((user) => user !== null);
  }

  /** Only AuthService should call this — needs the hash for password verification. */
  findByEmailForAuth(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async create(data: Prisma.UserCreateInput): Promise<AuthenticatedUser> {
    const user = await this.usersRepository.create(data);
    return toAuthenticatedUser(user);
  }
}
