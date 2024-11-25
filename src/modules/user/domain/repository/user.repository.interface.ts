import { CreateUserDTO } from '@user/application/dto';
import { User } from '@user/domain/entities/user.entity';

export interface IUserRepository {
  create(user: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  findOneBy(condition: Partial<User>): Promise<User | null>;
  find(): Promise<User[]>;
}
