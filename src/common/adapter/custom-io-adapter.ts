import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';

export class CustomIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): Server {
    try {
      const server = super.createIOServer(port, options);
      server.of('/ws/chat');
      return server;
    } catch (error) {
      console.error('Error creating Socket.IO server:', error);
      throw new Error('Failed to create Socket.IO server');
    }
  }
}
