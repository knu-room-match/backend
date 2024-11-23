import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@user/application/service/user.service';
import { UserController } from '@user/presentation/controller/user.controller';
import { User } from '@user/domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
