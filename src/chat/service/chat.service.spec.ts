import { ChatService } from './chat.service';
import { ChatParticipants } from '../entities/chat-participants.entity';
import { Chatroom } from '../entities/chatroom.entity';
import { Repository } from 'typeorm';
import { Message } from '../schemas/message.schema';
import { Model } from 'mongoose';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

describe('ChatService', () => {
  let service: ChatService;
  let chatroomRepository: Repository<Chatroom>;
  let chatParticipantsRepository: Repository<ChatParticipants>;
  let messageModel: Model<Message>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: getRepositoryToken(Chatroom),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ChatParticipants),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getModelToken(Message.name),
          useValue: {
            find: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
    chatroomRepository = module.get<Repository<Chatroom>>(getRepositoryToken(Chatroom));
    chatParticipantsRepository = module.get<Repository<ChatParticipants>>(getRepositoryToken(ChatParticipants));
    messageModel = module.get<Model<Message>>(getModelToken(Message.name));
  });

  it('should create a chatroom', async () => {
    const createChatDTO = {
      authorId: 1,
      name: 'Test Chatroom',
      description: 'Test Description',
      maxQuota: 10,
    };

    const mockChatroom = new Chatroom();
    mockChatroom.id = 1;
    mockChatroom.name = 'Test Chatroom';
    mockChatroom.description = 'Test Description';
    mockChatroom.maxQuota = 10;

    const mockParticipant = {
      id: 1,
      participant: {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
        chatParticipants: [],
      },
      chatroom: mockChatroom,
    };

    // Mock repository methods
    jest.spyOn(chatroomRepository, 'create').mockReturnValue(mockChatroom);
    jest.spyOn(chatroomRepository, 'save').mockResolvedValue(mockChatroom);
    jest.spyOn(chatParticipantsRepository, 'create').mockReturnValue(mockParticipant);
    jest.spyOn(chatParticipantsRepository, 'save').mockResolvedValue(mockParticipant);

    // Act
    const result = await service.create(createChatDTO);

    // Assert
    expect(result).toEqual(mockChatroom);
    expect(chatroomRepository.save).toHaveBeenCalledWith(mockChatroom);
    expect(chatParticipantsRepository.save).toHaveBeenCalledWith(mockParticipant);
  });

  it('should allow a user to enter a chatroom', async () => {
    const userId = 1;
    const roomId = 1;

    const mockChatroom = new Chatroom();
    mockChatroom.id = roomId;
    mockChatroom.name = 'Test Chatroom';
    mockChatroom.description = 'Test Description';
    mockChatroom.maxQuota = 10;

    const mockParticipant = {
      id: 1,
      participant: {
        id: userId,
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
        chatParticipants: [],
      },
      chatroom: mockChatroom,
    };

    jest.spyOn(chatroomRepository, 'findOne').mockResolvedValue(mockChatroom);
    jest.spyOn(chatParticipantsRepository, 'findOne').mockResolvedValue(null); // No existing participant
    jest.spyOn(chatParticipantsRepository, 'create').mockReturnValue(mockParticipant);
    jest.spyOn(chatParticipantsRepository, 'save').mockResolvedValue(mockParticipant);

    const result = await service.enter({ userId, roomId });

    expect(result).toEqual({ message: 'User has entered the chatroom successfully' });
    expect(chatParticipantsRepository.save).toHaveBeenCalledWith(mockParticipant);
  });

  it('should throw error when user already in chatroom', async () => {
    const userId = 1;
    const roomId = 1;

    const mockChatroom = new Chatroom();
    mockChatroom.id = roomId;
    mockChatroom.name = 'Test Chatroom';
    mockChatroom.description = 'Test Description';
    mockChatroom.maxQuota = 10;

    const mockParticipant = {
      id: 1,
      participant: {
        id: userId,
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
        chatParticipants: [],
      },
      chatroom: mockChatroom,
    };

    jest.spyOn(chatroomRepository, 'findOne').mockResolvedValue(mockChatroom);
    jest.spyOn(chatParticipantsRepository, 'findOne').mockResolvedValue(mockParticipant); // User already exists

    await expect(service.enter({ userId, roomId })).rejects.toThrow('User already in the chatroom');
  });
});
