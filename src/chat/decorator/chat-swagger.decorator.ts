import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateChatDTO } from '../dto/chat-request';

export class ChatSwaggerDocs {
  static createChat() {
    return applyDecorators(
      ApiOperation({ summary: '채팅방 생성', description: '새로운 채팅방을 생성합니다.' }),
      ApiResponse({ status: 201, description: '채팅방이 성공적으로 생성되었습니다.' }),
      ApiBody({ type: CreateChatDTO }),
    );
  }

  static enterChat() {
    return applyDecorators(
      ApiOperation({ summary: '채팅방 입장', description: '사용자가 채팅방에 입장합니다.' }),
      ApiResponse({ status: 200, description: '채팅방 입장이 완료되었습니다.' }),
      ApiBody({ schema: { example: { userId: 1, roomId: 2 } } }),
    );
  }

  static exitChat() {
    return applyDecorators(
      ApiOperation({ summary: '채팅방 나가기', description: '사용자가 채팅방에서 나갑니다.' }),
      ApiResponse({ status: 200, description: '채팅방 나가기가 완료되었습니다.' }),
      ApiBody({ schema: { example: { userId: 1, roomId: 2 } } }),
    );
  }
  static getMessages() {
    return applyDecorators(
      ApiOperation({ summary: '채팅방 메시지 조회', description: '특정 채팅방의 메시지를 조회합니다.' }),
      ApiResponse({ status: 200, description: '메시지 조회 성공.' }),
      ApiParam({ name: 'roomId', description: '채팅방 ID', example: 2 }),
    );
  }
}
