import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { ChatRepository } from '../repository/chat.repository';
import { CreateChatDTO } from '../dto/chat-request.dto';
import { ChatroomResponse } from '../dto/chat-response.dto';

describe('ChatService', () => {
  let chatService: ChatService;
  let chatRepository: jest.Mocked<ChatRepository>; // Mock the repository properly

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: ChatRepository,
          useValue: {
            findMessageByRoomId: jest.fn(),
            findAllChatroomsWithCurrentCount: jest.fn(),
            createChatroom: jest.fn(),
            findChatroomById: jest.fn(),
            findParticipantByUserIdAndRoomId: jest.fn(),
            createParticipant: jest.fn(),
            removeParticipant: jest.fn(),
          },
        },
      ],
    }).compile();

    chatService = module.get<ChatService>(ChatService);
    chatRepository = module.get(ChatRepository);
  });

  it('should be defined', () => {
    expect(chatService).toBeDefined();
  });

  it('should return messages for a given roomId', async () => {
    const mockMessages = [
      {
        _id: 'some-id',
        id: 1,
        content: 'Some message',
        __v: 0,
      },
    ];
    chatRepository.findMessageByRoomId.mockResolvedValue(mockMessages as any); // Ensure this is mocked

    const result = await chatService.findMessageByRoomId(1);
    expect(result).toEqual(mockMessages);
  });

  it('should return chatrooms with current count', async () => {
    const mockChatrooms = [
      {
        id: 1,
        name: 'Chatroom 1',
        description: 'A test chatroom',
        maxQuota: 10,
        currentCount: 5,
        status: 'active',
      },
    ];
    chatRepository.findAllChatroomsWithCurrentCount.mockResolvedValue(mockChatrooms);

    const result = await chatService.findAllChatroom();
    expect(result).toEqual(mockChatrooms.map(ChatroomResponse.of));
  });

  it('should create a new chatroom', async () => {
    const createChatDTO: CreateChatDTO = {
      authorId: 1,
      name: 'New Room',
      description: 'A new chatroom',
      maxQuota: 10,
    };
    const mockChatroom = {
      authorId: 1,
      name: 'New Room',
      description: 'A new chatroom',
      maxQuota: 10,
      id: 1,
      status: 'active',
      chatParticipants: [],
    };
    chatRepository.createChatroom.mockResolvedValue(mockChatroom as any);

    const result = await chatService.createChatroom(createChatDTO);
    expect(result).toEqual(mockChatroom);
  });

  it('should allow a user to enter a chatroom', async () => {
    const mockChatroom = {
      id: 1,
      name: 'Chatroom 1',
      description: 'A test chatroom',
      maxQuota: 10,
      status: 'active',
      chatParticipants: [],
    };
    chatRepository.findChatroomById.mockResolvedValue(mockChatroom as any);
    chatRepository.findParticipantByUserIdAndRoomId.mockResolvedValue(null);
    chatRepository.createParticipant.mockResolvedValue(undefined);

    await chatService.enterChatroom({ userId: 1, roomId: 1 });

    expect(chatRepository.createParticipant).toHaveBeenCalledWith(1, 1);
  });

  it('should throw an error if a user is already in the chatroom', async () => {
    const mockChatroom = {
      id: 1,
      name: 'Chatroom 1',
      description: 'A test chatroom',
      maxQuota: 10,
      status: 'active',
      chatParticipants: [],
    };
    chatRepository.findChatroomById.mockResolvedValue(mockChatroom as any);
    chatRepository.findParticipantByUserIdAndRoomId.mockResolvedValue({ chatroom: 1, participant: [], id: 1 } as any);

    await expect(chatService.enterChatroom({ userId: 1, roomId: 1 })).rejects.toThrowError(
      'User already in the chatroom',
    );
  });

  it('should allow a user to exit a chatroom', async () => {
    const mockParticipant = { userId: 1, roomId: 1 };
    chatRepository.findParticipantByUserIdAndRoomId.mockResolvedValue(mockParticipant as any);
    chatRepository.removeParticipant.mockResolvedValue(undefined);

    await chatService.exitChatroom({ userId: 1, roomId: 1 });

    expect(chatRepository.removeParticipant).toHaveBeenCalledWith(1, 1);
  });

  it('should throw an error if the user is not part of the chatroom', async () => {
    chatRepository.findParticipantByUserIdAndRoomId.mockResolvedValue(null);

    await expect(chatService.exitChatroom({ userId: 1, roomId: 1 })).rejects.toThrowError(
      'User not part of the chatroom',
    );
  });
});
