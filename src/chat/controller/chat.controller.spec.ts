import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from '../service/chat.service';
import { CreateChatDTO } from '../dto/chat-request.dto';
import { CHAT_MESSAGES } from '../../common/constants/chat.constants';

describe('ChatController', () => {
  let chatController: ChatController;
  let chatService: ChatService;

  // Mocking the ChatService
  const mockChatService = {
    createChatroom: jest.fn(),
    findAllChatroom: jest.fn(),
    findChatroomDetailByRoomId: jest.fn(),
    enterChatroom: jest.fn(),
    exitChatroom: jest.fn(),
    findMessageByRoomId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [{ provide: ChatService, useValue: mockChatService }],
    }).compile();

    chatController = module.get<ChatController>(ChatController);
    chatService = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(chatController).toBeDefined();
  });

  describe('createChat', () => {
    it('should create a chatroom successfully', async () => {
      const createChatDTO: CreateChatDTO = { authorId: 1, description: '설명', maxQuota: 5, name: 'Chat Room' };
      const result = { id: 1, name: 'Chat Room' };
      mockChatService.createChatroom.mockResolvedValue(result);

      const response = await chatController.createChat(createChatDTO);
      expect(response.data).toEqual(result);
      expect(response.message).toBe(CHAT_MESSAGES.SUCCESS.CHATROOM_CREATED);
    });
  });

  describe('findAllChatroom', () => {
    it('should return all chatrooms', async () => {
      const result = [
        { id: 1, name: 'Chat Room 1' },
        { id: 2, name: 'Chat Room 2' },
      ];
      mockChatService.findAllChatroom.mockResolvedValue(result);

      const response = await chatController.findAllChatroom();
      expect(response.data).toEqual(result);
      expect(response.message).toBe(CHAT_MESSAGES.SUCCESS.CHATROOM_FOUND);
    });
  });

  describe('findChatroom', () => {
    it('should return a chatroom by roomId', async () => {
      const roomId = 1;
      const result = { id: roomId, name: 'Chat Room 1' };
      mockChatService.findChatroomDetailByRoomId.mockResolvedValue(result);

      const response = await chatController.findChatroom(roomId);
      expect(response.data).toEqual(result);
      expect(response.message).toBe(CHAT_MESSAGES.SUCCESS.CHATROOM_FOUND);
    });
  });

  describe('enterChatroom', () => {
    it('should allow a user to enter a chatroom', async () => {
      const enterDto = { userId: 1, roomId: 1 };
      mockChatService.enterChatroom.mockResolvedValue(null);

      const response = await chatController.enterChatroom(enterDto);
      expect(response.data).toBeNull();
      expect(response.message).toBe(CHAT_MESSAGES.SUCCESS.CHATROOM_ENTERED);
    });
  });

  describe('exitChatroom', () => {
    it('should allow a user to exit a chatroom', async () => {
      const exitDto = { userId: 1, roomId: 1 };
      mockChatService.exitChatroom.mockResolvedValue(null);

      const response = await chatController.exitChatroom(exitDto);
      expect(response.data).toBeNull();
      expect(response.message).toBe(CHAT_MESSAGES.SUCCESS.CHATROOM_EXITED);
    });
  });

  describe('findMessages', () => {
    it('should return messages of a chatroom', async () => {
      const roomId = 1;
      const messages = [
        { userId: 1, message: 'Hello' },
        { userId: 2, message: 'Hi' },
      ];
      mockChatService.findMessageByRoomId.mockResolvedValue(messages);

      const response = await chatController.findMessages(roomId);
      expect(response.data).toEqual(messages);
      expect(response.message).toBe(CHAT_MESSAGES.SUCCESS.MESSAGES_RETRIEVED);
    });
  });
});
