import { Controller, Post, Get, Param, Body, NotFoundException, HttpStatus, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ChatService } from '../service/chat.service';
import { CreateChatDTO } from '../dto/chat-request.dto';
import { ChatSwaggerDocs } from '../decorator/chat-swagger.decorator';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  @ChatSwaggerDocs.createChat()
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
  @ChatSwaggerDocs.enterChat()
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
  @ChatSwaggerDocs.exitChat()
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

  /**
   * FIXME: 이름 변경해야함 getMessage -> findMEssages
   */
  @Get('messages/:roomId')
  @ChatSwaggerDocs.getMessages()
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

/**
TODO: 

- [ ] [POST] findMessages

- [ ] [POST] findChatroom

- [ ] [POST] createChatroom

- [ ] [POST] enterChatroom

- [ ] [DELETE] exitChatroom
 */
