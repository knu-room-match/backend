import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { IUserRepository } from '@user/domain/repository/user.repository.interface';
import { User } from '@user/domain/entities/user.entity';
import { UserResponse } from '@user/application/dto/user-response.dto';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from '../dto';

describe('UserService', () => {
  let service: UserService;
  let repository: IUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'IUserRepository',
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<IUserRepository>('IUserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and return a UserResponse', async () => {
    const createUserDTO: CreateUserDTO = { email: 'test@example.com', password: 'password', name: 'kang' };
    const user = new User();
    user.email = createUserDTO.email;
    user.password = createUserDTO.password;

    jest.spyOn(repository, 'create').mockResolvedValue(user);
    jest.spyOn(repository, 'save').mockResolvedValue(user);

    const result = await service.create(createUserDTO);
    expect(result).toEqual(UserResponse.of(user));
  });

  it('should return an array of UserResponse', async () => {
    const users = [new User(), new User()];
    jest.spyOn(repository, 'find').mockResolvedValue(users);

    const result = await service.findAll();
    expect(result).toEqual(users.map(UserResponse.of));
  });

  it('should return a UserResponse by ID', async () => {
    const user = new User();
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

    const result = await service.findById(1);
    expect(result).toEqual(UserResponse.of(user));
  });

  it('should throw NotFoundException if no user is found', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

    await expect(service.findById(1)).rejects.toThrow(NotFoundException);
  });
});
