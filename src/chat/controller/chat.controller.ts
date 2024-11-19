import { Controller, Post, Get, Param, Body, NotFoundException, HttpStatus, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ChatService } from '../service/chat.service';
import { CreateChatDTO } from '../dto/chat-request';

@ApiTags('Chat') // Swagger에서 API 그룹 이름
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  @ApiOperation({ summary: '채팅방 생성', description: '새로운 채팅방을 생성합니다.' })
  @ApiResponse({ status: 201, description: '채팅방이 성공적으로 생성되었습니다.' })
  @ApiBody({ type: CreateChatDTO })
  async createChat(@Body() createChatDTO: CreateChatDTO) {
    try {
      const chatroom = await this.chatService.create(createChatDTO);
      return {
        status: HttpStatus.CREATED,
        message: '채팅방이 성공적으로 생성되었습니다.',
        data: chatroom,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post('enter')
  @ApiOperation({ summary: '채팅방 입장', description: '사용자가 채팅방에 입장합니다.' })
  @ApiResponse({ status: 200, description: '채팅방 입장이 완료되었습니다.' })
  @ApiBody({ schema: { example: { userId: 1, roomId: 2 } } })
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
  @ApiOperation({ summary: '채팅방 나가기', description: '사용자가 채팅방에서 나갑니다.' })
  @ApiResponse({ status: 200, description: '채팅방 나가기가 완료되었습니다.' })
  @ApiBody({ schema: { example: { userId: 1, roomId: 2 } } })
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
  @ApiOperation({ summary: '채팅방 메시지 조회', description: '특정 채팅방의 메시지를 조회합니다.' })
  @ApiResponse({ status: 200, description: '메시지 조회 성공.' })
  @ApiParam({ name: 'roomId', description: '채팅방 ID', example: 2 })
  async getMessages(@Param('roomId') roomId: number) {
    try {
      const messages = await this.chatService.findMessageByRoomId(roomId);
      return {
        status: HttpStatus.OK,
        message: '메시지가 성공적으로 조회되었습니다.',
        data: messages,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
