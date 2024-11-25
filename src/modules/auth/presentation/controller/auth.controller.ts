import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '@auth/application/service/auth.service';
import { AuthCredentials } from '@auth/application/dto/auth-request.dto';
import { ResponseEntity } from '@common/dto/response-entity.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() authCredentials: AuthCredentials) {
    const authResponse = await this.authService.signIn(authCredentials);
    return ResponseEntity.success(authResponse, '로그인에 성공');
  }

  @Post('refresh')
  async refresh(@Body() refreshToken: { token: string }) {
    const authResponse = await this.authService.refresh(refreshToken.token);
    return ResponseEntity.success(authResponse, '토큰 갱신에 성공');
  }
}
