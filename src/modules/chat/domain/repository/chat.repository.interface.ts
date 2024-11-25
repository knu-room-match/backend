import { Chatroom } from '@chat/domain/entities/chatroom.entity';
import { Message } from '@chat/domain/schemas/message.schema';
import { ChatParticipants } from '@chat/domain/entities/chat-participants.entity';
import { ChatroomWithCount, ChatroomWithParticipants } from '@chat/domain/types/chat.type';
import { CreateChatDTO } from '@chat/application/dto/chat-request.dto';

export interface IChatRepository {
  findMessageByRoomId(roomId: number): Promise<Message[]>;
  findChatroomById(roomId: number): Promise<Chatroom | null>;
  findParticipantByUserIdAndRoomId(userId: number, roomId: number): Promise<ChatParticipants | null>;
  createParticipant(userId: number, roomId: number): Promise<ChatParticipants>;
  removeParticipant(userId: number, roomId: number): Promise<ChatParticipants | null>;
  findChatroom(): Promise<Chatroom[]>;
  findChatroomDetailByRoomId(roomId: number): Promise<ChatroomWithParticipants | null>;
  findAllChatroomsWithCurrentCount(): Promise<ChatroomWithCount[]>;
  createChatroom(createChatDTO: CreateChatDTO): Promise<Chatroom>;
}
