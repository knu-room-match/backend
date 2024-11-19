import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { CreateUserDTO } from '../dto/user-request.dto';
import { User } from '../entities/user.entity';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  // Mock된 데이터
  const mockUser = new User();
  mockUser.id = 1;
  mockUser.email = 'test@example.com';
  mockUser.name = 'Test User';
  mockUser.createdAt = new Date();
  mockUser.updatedAt = new Date();

  const mockUserService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findById: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await userController.findAll();
      expect(result).toEqual([mockUser]);
      expect(userService.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a single user', async () => {
      const result = await userController.findById(1);
      expect(result).toEqual(mockUser);
      expect(userService.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('createUser', () => {
    it('should create and return a user', async () => {
      const createUserDto: CreateUserDTO = { email: 'test@example.com', name: 'Test User' };
      const result = await userController.createUser(createUserDto);
      expect(result).toEqual(mockUser);
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
  });
});
