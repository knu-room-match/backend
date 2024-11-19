import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChatroomStatus } from './enum/chatroom-status.enum';
import { ChatParticipants } from './chat-participants.entity';

@Entity({ name: 'chatrooms' })
export class Chatroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  maxQuota: number;

  @Column({
    type: 'enum',
    enum: ChatroomStatus,
    default: ChatroomStatus.PENDING,
  })
  status: ChatroomStatus;

  @OneToMany(() => ChatParticipants, (chatParticipants) => chatParticipants.chatroom)
  chatParticipants: ChatParticipants[];
}
