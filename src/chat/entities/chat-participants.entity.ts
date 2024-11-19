import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Chatroom } from './chatroom.entity';

@Entity({ name: 'chat_participants' })
export class ChatParticipants {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.chatParticipants)
  participant: User;

  @ManyToOne(() => Chatroom, (chatroom) => chatroom.chatParticipants)
  chatroom: Chatroom;
}
