import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '@auth/application/service/auth.service';
import { AuthCredentials } from '@auth/application/dto/auth-request.dto';
import { ResponseEntity } from '@common/dto/response-entity.dto';
import { AuthGuard } from '../guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() authCredentials: AuthCredentials) {
    const authResponse = await this.authService.signIn(authCredentials);
    return ResponseEntity.success(authResponse, '로그인에 성공');
  }

  // @Get('test')
  // @UseGuards(AuthGuard)
  // async test(@Request() req) {
  //   const userId = req.user.id; // 요청 객체에서 userId 접근
  //   return `User ID: ${userId}`;
  // }
}
