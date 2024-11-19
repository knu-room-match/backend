import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chatroom } from '../entities/chatroom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chatroom)
    private readonly chatroomRepository: Repository<Chatroom>,
  ) {}
}
