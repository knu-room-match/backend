import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ChatParticipants } from '@chat/domain/entities/chat-participants.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;
  /**
   * TODO: bcrypt 추가
   */
  @Column()
  password: string;
  /**
   * status 추가
   * 설문 전, 설문 완료
   * --> 설문이 완료되어야만 chat을 볼 수 있는 권한을 얻게 된다.
   */
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => ChatParticipants, (chatParticipants) => chatParticipants.participant)
  chatParticipants: ChatParticipants[];
}
