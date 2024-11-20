import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../dto/user-request.dto';

export class UserSwaggerDocs {
  static findAll() {
    return applyDecorators(
      ApiOperation({
        summary: '모든 사용자 조회',
        description: '저장된 모든 사용자를 조회합니다.',
      }),
      ApiResponse({
        status: 200,
        description: '사용자 목록 조회 성공',
        type: [User],
      }),
    );
  }

  static findById() {
    return applyDecorators(
      ApiOperation({
        summary: '특정 사용자 조회',
        description: 'ID로 특정 사용자를 조회합니다.',
      }),
      ApiResponse({
        status: 200,
        description: '사용자 조회 성공',
        type: User,
      }),
    );
  }

  static createUser() {
    return applyDecorators(
      ApiOperation({
        summary: '사용자 생성',
        description: '새로운 사용자를 생성합니다.',
      }),
      ApiResponse({
        status: 201,
        description: '사용자 생성 성공',
        type: User,
      }),
      ApiBody({
        description: '생성할 사용자 정보',
        type: CreateUserDTO,
      }),
    );
  }
}
