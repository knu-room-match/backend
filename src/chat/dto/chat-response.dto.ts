import { UserResponse } from '../../user/dto/user-response.dto';
import { ChatroomWithCount } from '../types/chat.type';

export class ChatroomDetailResponse {
  id: number;
  name: string;
  description: string;
  maxQuota: number;
  status: string;
  participants: UserResponse[];
  static of() {}
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
    console.log('asd', chatroom);
    return new ChatroomResponse(chatroom);
  }
}

// export class MessagesResponse {
//   static of() {}
// }
