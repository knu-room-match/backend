import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/domain/entities/user.entity';
import { IUserRepository } from '@user/domain/repository/user.repository.interface';
import { CreateUserDTO } from '@user/application/dto';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(user: CreateUserDTO): Promise<User> {
    const createdUser = this.repository.create(user);
    return createdUser;
  }

  save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  findOneBy(condition: Partial<User>): Promise<User | null> {
    return this.repository.findOneBy(condition);
  }

  find(): Promise<User[]> {
    return this.repository.find();
  }
}
