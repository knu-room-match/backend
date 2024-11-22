import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDTO } from '../dto/user-request.dto';
import { User } from '../entities/user.entity';
import { UserResponse } from '../dto/user-response.dto';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a UserResponse', async () => {
      const createUserDTO: CreateUserDTO = {
        email: 'test@example.com',
        name: 'Test User',
      };

      const user = new User();
      user.id = 1;
      user.email = createUserDTO.email;
      user.name = createUserDTO.name;

      jest.spyOn(repository, 'create').mockReturnValue(user);
      jest.spyOn(repository, 'save').mockResolvedValue(user);

      const result = await service.create(createUserDTO);

      expect(repository.create).toHaveBeenCalledWith(createUserDTO);
      expect(repository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(UserResponse.of(user)); // UserResponse 반환 확인
    });
  });

  describe('findAll', () => {
    it('should return an array of UserResponse', async () => {
      const users = [
        { id: 1, email: 'user1@example.com', name: 'User One' },
        { id: 2, email: 'user2@example.com', name: 'User Two' },
      ] as User[];

      jest.spyOn(repository, 'find').mockResolvedValue(users);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(users.map(UserResponse.of)); // UserResponse 배열 반환 확인
    });
  });

  describe('findById', () => {
    it('should return a UserResponse by ID', async () => {
      const user = { id: 1, email: 'user@example.com', name: 'Test User' } as User;

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

      const result = await service.findById(1);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(UserResponse.of(user)); // UserResponse 반환 확인
    });

    it('should throw NotFoundException if no user is found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findById(999)).rejects.toThrow(NotFoundException); // 예외 발생 확인
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });
});
