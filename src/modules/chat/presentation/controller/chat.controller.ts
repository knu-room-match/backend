import { Controller, Post, Get, Param, Body, HttpStatus, Delete, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ChatSwaggerDocs } from '@chat/presentation/swagger/chat-swagger-docs';
import { ChatService } from '@chat/application/service/chat.service';
import { CreateChatDTO } from '@chat/application/dto/chat-request.dto';

import { ResponseEntity } from '@common/dto/response-entity.dto';
import { CHAT_MESSAGES } from '@common/constants/chat.constants';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('room')
  @HttpCode(HttpStatus.CREATED)
  @ChatSwaggerDocs.createChatroom()
  async createChat(@Body() createChatDTO: CreateChatDTO) {
    const chatroom = await this.chatService.createChatroom(createChatDTO);
    return ResponseEntity.success(chatroom, CHAT_MESSAGES.SUCCESS.CHATROOM_CREATED);
  }

  @Get('room')
  @HttpCode(HttpStatus.OK)
  @ChatSwaggerDocs.findAllChatroom()
  async findAllChatroom() {
    const result = await this.chatService.findAllChatroom();
    return ResponseEntity.success(result, CHAT_MESSAGES.SUCCESS.CHATROOM_FOUND);
  }

  @Get('room/:roomId')
  @HttpCode(HttpStatus.OK)
  @ChatSwaggerDocs.findChatroom()
  async findChatroom(@Param('roomId') roomId: number) {
    const result = await this.chatService.findChatroomDetailByRoomId(roomId);
    return ResponseEntity.success(result, CHAT_MESSAGES.SUCCESS.CHATROOM_FOUND);
  }

  @Post('room/enter')
  @HttpCode(HttpStatus.OK)
  @ChatSwaggerDocs.enterChatroom()
  async enterChatroom(@Body() enterDto: { userId: number; roomId: number }) {
    await this.chatService.enterChatroom(enterDto);
    return ResponseEntity.success(null, CHAT_MESSAGES.SUCCESS.CHATROOM_ENTERED);
  }

  @Delete('room')
  @HttpCode(HttpStatus.OK)
  @ChatSwaggerDocs.exitChatroom()
  async exitChatroom(@Body() exitDto: { userId: number; roomId: number }) {
    await this.chatService.exitChatroom(exitDto);
    return ResponseEntity.success(null, CHAT_MESSAGES.SUCCESS.CHATROOM_EXITED);
  }

  @Get('messages/:roomId')
  @HttpCode(HttpStatus.OK)
  @ChatSwaggerDocs.findMessages()
  async findMessages(@Param('roomId') roomId: number) {
    const messages = await this.chatService.findMessageByRoomId(roomId);
    return ResponseEntity.success(messages, CHAT_MESSAGES.SUCCESS.MESSAGES_RETRIEVED);
  }
}
