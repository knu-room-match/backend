import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    description: '사용자 이메일 주소',
    example: 'example@domain.com',
  })
  email: string;

  @ApiProperty({
    description: '사용자 이름',
    example: '홍길동',
  })
  name: string;

  @ApiProperty({
    description: '사용자 비밀번호',
    example: 'abc',
  })
  password: string;
}
