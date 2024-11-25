import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@user/application/service/user.service';
import { UserController } from '@user/presentation/controller/user.controller';
import { User } from '@user/domain/entities/user.entity';
import { UserRepository } from '@user/infrastructure/repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
