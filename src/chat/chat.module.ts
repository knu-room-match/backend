import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { ChatController } from './controller/chat.controller';
import { ChatService } from './service/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chatroom } from './entities/chatroom.entity';
import { ChatParticipants } from './entities/chat-participants.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chatroom, ChatParticipants]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
