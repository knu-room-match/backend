import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from '@chat/presentation/gateway/chat.gateway';
import { Message, MessageSchema } from '@chat/domain/schemas/message.schema';
import { ChatController } from '@chat/presentation/controller/chat.controller';
import { ChatService } from '@chat/application/service/chat.service';
import { Chatroom } from '@chat/domain/entities/chatroom.entity';
import { ChatParticipants } from '@chat/domain/entities/chat-participants.entity';
import { ChatRepository } from '@chat/domain/repository/chat.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chatroom, ChatParticipants]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [ChatGateway, ChatService, ChatRepository],
  controllers: [ChatController],
})
export class ChatModule {}
