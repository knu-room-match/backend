import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/user-request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create(createUserDTO);
    return await this.userRepository.save(user);
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async findById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }
}
