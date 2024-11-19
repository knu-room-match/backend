import { ChatParticipants } from 'src/chat/entities/chat-participants.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => ChatParticipants, (chatParticipants) => chatParticipants.participant)
  chatParticipants: ChatParticipants[];
}
