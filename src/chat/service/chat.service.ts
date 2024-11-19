import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chatroom } from '../entities/chatroom.entity';
import { Repository } from 'typeorm';
import { CreateChatDTO } from '../dto/chat-request';
import { ChatParticipants } from '../entities/chat-participants.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../schemas/message.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
    @InjectRepository(Chatroom)
    private readonly chatroomRepository: Repository<Chatroom>,
    @InjectRepository(ChatParticipants)
    private readonly chatParticipantsRepository: Repository<ChatParticipants>,
  ) {}

  async findMessageByRoomId(roomId: number) {
    const messages = await this.messageModel.find({ room_id: roomId }).exec();
    console.log(messages);
    if (!messages) {
      throw new Error('Messages not found');
    }

    return messages;
  }

  async create(createChatDTO: CreateChatDTO) {
    const { name, description, maxQuota } = createChatDTO;

    const chatroom = this.chatroomRepository.create({
      name,
      description,
      maxQuota,
    });

    await this.chatroomRepository.save(chatroom);

    const participant = this.chatParticipantsRepository.create({
      participant: { id: createChatDTO.authorId },
      chatroom: chatroom,
    });

    await this.chatParticipantsRepository.save(participant);

    return chatroom;
  }

  // 채팅방에 입장
  async enter({ userId, roomId }: { userId: number; roomId: number }) {
    const chatroom = await this.chatroomRepository.findOne({ where: { id: roomId } });

    if (!chatroom) {
      throw new Error('Chatroom not found');
    }
    const existingParticipant = await this.chatParticipantsRepository.findOne({
      where: { participant: { id: userId }, chatroom: { id: roomId } },
    });

    if (existingParticipant) {
      throw new Error('User already in the chatroom');
    }
    const participant = this.chatParticipantsRepository.create({
      participant: { id: userId },
      chatroom: chatroom,
    });

    await this.chatParticipantsRepository.save(participant);

    return { message: 'User has entered the chatroom successfully' };
  }

  async exit({ userId, roomId }: { userId: number; roomId: number }) {
    const participant = await this.chatParticipantsRepository.findOne({
      where: { participant: { id: userId }, chatroom: { id: roomId } },
    });

    if (!participant) {
      throw new Error('User not part of the chatroom');
    }

    await this.chatParticipantsRepository.remove(participant);

    return { message: 'User has exited the chatroom successfully' };
  }
}
