import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/user-request.dto';
import { UserDetailResponse, UserResponse } from '../dto/user-response.dto';
import { UserNotFoundException } from '../exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * @param createUserDTO
   * @description
   * 해당 메소드는 유저를 생성하는 메소드 입니다.
   */
  async create(createUserDTO: CreateUserDTO): Promise<UserResponse> {
    const user = this.userRepository.create(createUserDTO);
    const savedUser = await this.userRepository.save(user);
    return UserResponse.of(savedUser);
  }

  /**
   * @description
   * 해당 메소드는 해당 이메일의 유저를 조회하는 메소드 입니다.
   */
  async findByEmail(email: string): Promise<UserDetailResponse> {
    const user = await this.userRepository.findOneBy({ email });
    return UserDetailResponse.of(user);
  }

  /**
   * @description
   * 해당 메소드는 전체 유저를 조회하는 메소드 입니다.
   */
  async findAll(): Promise<UserResponse[]> {
    const foundUser = await this.userRepository.find();
    return foundUser.map(UserResponse.of);
  }
  /**
   * @param id
   * @description 유저의 PK를 통해 특정 유저를 찾는 함수입니다.
   */
  async findById(id: number): Promise<UserResponse> {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (foundUser == null) {
      throw new UserNotFoundException(`User with ID ${id} not found`);
    }
    return UserResponse.of(foundUser);
  }
}
