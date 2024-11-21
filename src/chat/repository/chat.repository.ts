import { Model } from 'mongoose';
import { Chatroom } from '../entities/chatroom.entity';
import { Message } from '../schemas/message.schema';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatParticipants } from '../entities/chat-participants.entity';
import { ChatroomWithCount, ChatroomWithParticipants } from '../types/chat.type';
import { UserSimple } from '../../user/types/user.type';
import { CreateChatDTO } from '../dto/chat-request.dto';

export class ChatRepository {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
    @InjectRepository(Chatroom)
    private readonly chatroomRepository: Repository<Chatroom>,
    @InjectRepository(ChatParticipants)
    private readonly chatParticipantsRepository: Repository<ChatParticipants>,
  ) {}

  async findMessageByRoomId(roomId: number) {
    return this.messageModel.find({ room_id: roomId }).exec();
  }

  async findChatroomById(roomId: number) {
    return this.chatroomRepository.findOne({ where: { id: roomId } });
  }

  async findParticipantByUserIdAndRoomId(userId: number, roomId: number) {
    return this.chatParticipantsRepository.findOne({
      where: { participant: { id: userId }, chatroom: { id: roomId } },
    });
  }

  async createParticipant(userId: number, roomId: number) {
    const participant = await this.chatParticipantsRepository.create({
      participant: { id: userId },
      chatroom: { id: roomId },
    });
    return this.chatParticipantsRepository.save(participant);
  }

  async removeParticipant(userId: number, roomId: number) {
    const participant = await this.findParticipantByUserIdAndRoomId(userId, roomId);
    if (participant) {
      return this.chatParticipantsRepository.remove(participant);
    }
    return null;
  }

  async findChatroom() {
    return this.chatroomRepository.find();
  }

  async findChatroomDetailByRoomId(roomId: number): Promise<ChatroomWithParticipants | null> {
    const chatroom = await this.chatroomRepository.manager
      .createQueryBuilder(Chatroom, 'chatroom')
      .leftJoinAndSelect('chatroom.chatParticipants', 'chatParticipants')
      .leftJoinAndSelect('chatParticipants.participant', 'participant')
      .where('chatroom.id = :roomId', { roomId })
      .getOne();

    if (!chatroom) return null;

    return {
      id: chatroom.id,
      name: chatroom.name,
      description: chatroom.description,
      maxQuota: chatroom.maxQuota,
      status: chatroom.status,
      currentCount: chatroom.chatParticipants.length,
      participants: this.mapParticipants(chatroom),
    };
  }

  async findAllChatroomsWithCurrentCount(): Promise<ChatroomWithCount[]> {
    const rawChatrooms = await this.chatroomRepository.manager
      .createQueryBuilder(Chatroom, 'chatroom')
      .leftJoin('chatroom.chatParticipants', 'chatParticipants')
      .addSelect('COALESCE(COUNT(chatParticipants.id), 0)', 'currentCount')
      .groupBy('chatroom.id')
      .getRawMany();

    return rawChatrooms.map(this.mapChatroomWithCount);
  }

  async createChatroom(createChatDTO: CreateChatDTO) {
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

  private mapParticipants(chatroom: Chatroom): UserSimple[] {
    return chatroom.chatParticipants.map((chatParticipant) => ({
      id: chatParticipant.participant.id,
      email: chatParticipant.participant.email,
      name: chatParticipant.participant.name,
    }));
  }

  private mapChatroomWithCount(rawChatroom: any): ChatroomWithCount {
    return {
      id: rawChatroom.chatroom_id,
      name: rawChatroom.chatroom_name,
      description: rawChatroom.chatroom_description,
      maxQuota: rawChatroom.chatroom_maxQuota,
      status: rawChatroom.chatroom_status,
      currentCount: parseInt(rawChatroom.currentCount, 10),
    };
  }
}
