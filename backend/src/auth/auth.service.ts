import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {
  AuthenticatedUser,
  toAuthenticatedUser,
} from '../common/types/authenticated-user.type';
import { JwtPayload } from '../common/types/jwt-payload.type';
import { UsersService } from '../users/users.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

const BCRYPT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    if (await this.usersService.isEmailTaken(dto.email)) {
      throw new ConflictException('Email is already in use');
    }
    if (await this.usersService.isUsernameTaken(dto.username)) {
      throw new ConflictException('Username is already in use');
    }

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);

    let user: AuthenticatedUser;
    try {
      user = await this.usersService.create({
        email: dto.email,
        username: dto.username,
        passwordHash,
      });
    } catch (error) {
      // Race-condition safety net: another request inserted the same
      // email/username between our pre-check and this create().
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email or username is already in use');
      }
      throw error;
    }

    return this.buildAuthResponse(user);
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmailForAuth(dto.email);
    // Same response shape regardless of which side fails — prevents user enumeration.
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.buildAuthResponse(toAuthenticatedUser(user));
  }

  private async buildAuthResponse(
    user: AuthenticatedUser,
  ): Promise<AuthResponseDto> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, user };
  }
}
