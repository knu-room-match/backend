import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({})
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: any, roomId: string) {
    client.join(roomId);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: { roomId: string; message: string }) {
    const { roomId, message } = payload;
    this.server.to(roomId).emit('message', message);
  }
}
