import { Injectable } from '@nestjs/common';
import { CreateChatDTO } from '@chat/dto/chat-request.dto';
import { ChatroomResponse } from '@chat/dto/chat-response.dto';
import { ChatRepository } from '@chat/repository/chat.repository';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async findMessageByRoomId(roomId: number) {
    const foundMessages = await this.chatRepository.findMessageByRoomId(roomId);
    return foundMessages;
  }

  async findChatroomDetailByRoomId(roomId: number) {
    const foundChatroomDetail = await this.chatRepository.findChatroomDetailByRoomId(roomId);
    return foundChatroomDetail;
  }

  async findAllChatroom(): Promise<ChatroomResponse[]> {
    const foundChatroom = await this.chatRepository.findAllChatroomsWithCurrentCount();
    return foundChatroom.map(ChatroomResponse.of);
  }

  async createChatroom(createChatDTO: CreateChatDTO) {
    return await this.chatRepository.createChatroom(createChatDTO);
  }

  async enterChatroom({ userId, roomId }: { userId: number; roomId: number }) {
    const chatroom = await this.chatRepository.findChatroomById(roomId);
    if (!chatroom) {
      throw new Error('Chatroom not found');
    }

    const existingParticipant = await this.chatRepository.findParticipantByUserIdAndRoomId(userId, roomId);
    if (existingParticipant) {
      throw new Error('User already in the chatroom');
    }

    await this.chatRepository.createParticipant(userId, roomId);
  }

  async exitChatroom({ userId, roomId }: { userId: number; roomId: number }) {
    const participant = await this.chatRepository.findParticipantByUserIdAndRoomId(userId, roomId);
    if (!participant) {
      throw new Error('User not part of the chatroom');
    }
    await this.chatRepository.removeParticipant(userId, roomId);
  }
}
