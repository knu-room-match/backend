import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from '../service/chat.service';
import { HttpStatus } from '@nestjs/common';

describe('ChatController', () => {
  let chatController: ChatController;
  let chatService: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [
        {
          provide: ChatService,
          useValue: {
            create: jest.fn(),
            enter: jest.fn(),
            exit: jest.fn(),
            findMessageByRoomId: jest.fn(),
          },
        },
      ],
    }).compile();

    chatController = module.get<ChatController>(ChatController);
    chatService = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(chatController).toBeDefined();
  });

  it('should create a chatroom', async () => {
    const mockCreateChatDTO = {
      authorId: 1,
      name: 'chatroom1',
      description: 'This is a test chatroom',
      maxQuota: 5,
    };

    const mockChatroom = {
      id: 1,
      ...mockCreateChatDTO,
      chatParticipants: [],
    };
    chatService.create = jest.fn().mockResolvedValue(mockChatroom);
    const result = await chatController.createChat(mockCreateChatDTO);
    expect(result.status).toBe(HttpStatus.CREATED);
    expect(result.message).toBe('채팅방이 성공적으로 생성되었습니다.');
    expect(result.data).toEqual(mockChatroom);
    expect(chatService.create).toHaveBeenCalledWith(mockCreateChatDTO);
  });

  it('should enter chatroom', async () => {
    const enterDto = { userId: 1, roomId: 1 };
    const mockResult = { message: 'User entered the chatroom' };
    chatService.enter = jest.fn().mockResolvedValue(mockResult);
    const result = await chatController.enterChat(enterDto);
    expect(result.status).toBe(HttpStatus.OK);
    expect(result.message).toBe(mockResult.message);
    expect(chatService.enter).toHaveBeenCalledWith(enterDto);
  });

  it('should exit chatroom', async () => {
    const exitDto = { userId: 1, roomId: 1 };
    const mockResult = { message: 'User exited the chatroom' };
    chatService.exit = jest.fn().mockResolvedValue(mockResult);
    const result = await chatController.exitChat(exitDto);
    expect(result.status).toBe(HttpStatus.OK);
    expect(result.message).toBe(mockResult.message);
    expect(chatService.exit).toHaveBeenCalledWith(exitDto);
  });

  it('should get messages by roomId', async () => {
    const roomId = 1;
    const mockMessages = [
      { message_id: 1, room_id: 1, sender_id: 1, content: 'Hello', timestamp: new Date() },
      { message_id: 2, room_id: 1, sender_id: 2, content: 'Hi', timestamp: new Date() },
    ];
    chatService.findMessageByRoomId = jest.fn().mockResolvedValue(mockMessages);
    const result = await chatController.getMessages(roomId);
    expect(result.status).toBe(HttpStatus.OK);
    expect(result.message).toBe('메시지가 성공적으로 조회되었습니다.');
    expect(result.data).toEqual(mockMessages);
    expect(chatService.findMessageByRoomId).toHaveBeenCalledWith(roomId);
  });
});
