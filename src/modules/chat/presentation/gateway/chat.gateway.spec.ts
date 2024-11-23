import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { Server, Socket } from 'socket.io';

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let server: Server;
  let client: Socket;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGateway],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
    server = { to: jest.fn().mockReturnValue({ emit: jest.fn() }) } as unknown as Server;
    gateway.server = server;
    client = { join: jest.fn(), emit: jest.fn() } as unknown as Socket;
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('handleJoinRoom', () => {
    it('should call join on the client with the roomId', () => {
      const roomId = 'testRoom';
      gateway.handleJoinRoom(client, roomId);

      expect(client.join).toHaveBeenCalledWith(roomId);
    });
  });

  describe('handleMessage', () => {
    it('should emit message to the correct room', () => {
      const roomId = 'testRoom';
      const message = 'Hello, world!';
      gateway.handleMessage(client, { roomId, message });

      expect(server.to).toHaveBeenCalledWith(roomId);
      expect(server.to(roomId).emit).toHaveBeenCalledWith('message', message);
    });
  });
});
