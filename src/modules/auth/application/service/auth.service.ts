import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@user/application/service/user.service';
import { jwtConfig } from '@config/jwt.config';
import { RedisService } from '@shared/application/redis/redis.service';

import { AuthResponse, AuthCredentials } from '@auth/application/dto';

@Injectable()
export class AuthService {
  private readonly refreshJwtSignOptions;
  private readonly accessJwtSignOptions;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {
    const config = jwtConfig();
    this.refreshJwtSignOptions = config.refreshJwtSignOptions;
    this.accessJwtSignOptions = config.accessJwtSignOptions;
  }
  async signIn({ email, password }: AuthCredentials): Promise<AuthResponse> {
    const user = await this.userService.findByEmail(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, sub: user.email, username: user.name };
    return AuthResponse.of(await this.issueAccessToken(payload), await this.issueRefreshToken(payload));
  }
  async refresh(token: string): Promise<AuthResponse> {
    const payload = this.jwtService.verify(token, this.refreshJwtSignOptions);
    const storedToken = await this.redisService.get(payload.sub);
    if (storedToken !== token) {
      throw new UnauthorizedException();
    }
    return AuthResponse.of(await this.issueAccessToken(payload), await this.issueRefreshToken(payload));
  }

  private async issueAccessToken(payload) {
    return await this.issueToken(payload, this.accessJwtSignOptions);
  }
  private async issueRefreshToken(payload) {
    const refreshToken = await this.issueToken(payload, this.refreshJwtSignOptions);
    await this.redisService.set(payload.sub, refreshToken);
    return refreshToken;
  }
  private async issueToken(payload, options) {
    return await this.jwtService.signAsync(payload, options);
  }
}
