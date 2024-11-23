import { UserSimple } from '@user/types/user.type';
export type Chatroom = {
  id: number;
  name: string;
  description: string;
  maxQuota: number;
  status: string;
};
export type ChatroomWithCount = Chatroom & {
  currentCount: number;
};

export type ChatroomWithParticipants = ChatroomWithCount & {
  participants: UserSimple[];
};
