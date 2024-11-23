import { UserSimple } from '@user/types/user.type';
import { ChatroomWithCount, ChatroomWithParticipants } from '@chat/domain/types/chat.type';

export class ChatroomDetailResponse {
  id: number;
  name: string;
  description: string;
  maxQuota: number;
  status: string;
  participants: UserSimple[];
  constructor(chatroom: ChatroomWithParticipants) {
    this.id = chatroom.id;
    this.name = chatroom.name;
    this.description = chatroom.description;
    this.maxQuota = chatroom.maxQuota;
    this.status = chatroom.status;
    this.participants = chatroom.participants;
  }
  static of(chatroom: ChatroomWithParticipants) {
    return new ChatroomResponse(chatroom);
  }
}

export class ChatroomResponse {
  id: number;
  name: string;
  description: string;
  maxQuota: number;
  currentCount: number;
  status: string;
  constructor(chatroom: ChatroomWithCount) {
    this.id = chatroom.id;
    this.name = chatroom.name;
    this.description = chatroom.description;
    this.maxQuota = chatroom.maxQuota;
    this.currentCount = chatroom.currentCount;
    this.status = chatroom.status;
  }
  static of(chatroom: ChatroomWithCount) {
    return new ChatroomResponse(chatroom);
  }
}
