import { Controller, Post, Get, Param, Body, NotFoundException, HttpStatus, Delete } from '@nestjs/common';
import { ChatService } from '../service/chat.service';
import { CreateChatDTO } from '../dto/chat-request';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  async createChat(@Body() createChatDTO: CreateChatDTO) {
    try {
      const chatroom = await this.chatService.create(createChatDTO);
      return {
        status: HttpStatus.CREATED,
        message: 'Chatroom created successfully',
        data: chatroom,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post('enter')
  async enterChat(@Body() enterDto: { userId: number; roomId: number }) {
    try {
      const result = await this.chatService.enter(enterDto);
      return {
        status: HttpStatus.OK,
        message: result.message,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete()
  async exitChat(@Body() exitDto: { userId: number; roomId: number }) {
    try {
      const result = await this.chatService.exit(exitDto);
      return {
        status: HttpStatus.OK,
        message: result.message,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('messages/:roomId')
  async getMessages(@Param('roomId') roomId: number) {
    try {
      const messages = await this.chatService.findMessageByRoomId(roomId);
      return {
        status: HttpStatus.OK,
        message: 'Messages fetched successfully',
        data: messages,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
