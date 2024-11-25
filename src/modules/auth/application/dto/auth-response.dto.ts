import { Token } from '@auth/domain/types/auth.type';

export class AuthResponse {
  accessToken: Token;
  refreshToken: Token;
  constructor(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
  static of(accessToken, refreshToken) {
    return new AuthResponse(accessToken, refreshToken);
  }
}
