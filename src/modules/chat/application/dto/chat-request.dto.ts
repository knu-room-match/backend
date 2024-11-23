import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDTO {
  @ApiProperty({
    description: '채팅방 생성자의 ID',
    example: 1,
  })
  authorId: number;

  @ApiProperty({
    description: '채팅방 이름',
    example: '일반 토론방',
  })
  name: string;

  @ApiProperty({
    description: '채팅방 설명',
    example: '이 채팅방은 일반 주제 토론을 위한 방입니다.',
  })
  description: string;

  @ApiProperty({
    description: '최대 참여자 수',
    example: 50,
  })
  maxQuota: number;
}
