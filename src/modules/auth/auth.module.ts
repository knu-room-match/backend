import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@auth/presentation/controller/auth.controller';
import { AuthService } from '@auth/application/service/auth.service';
import { UserModule } from '@user/user.module';

@Module({
  imports: [JwtModule.register({}), UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
