import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ChatService } from '../service/chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // 채팅 방 입장
  @Post()
  async enterRoom() {}

  // 채팅 방 나가기
  @Delete()
  async exitRoom() {}

  // 채팅 내역 조회
  @Get()
  async findByRoomId() {}
}
