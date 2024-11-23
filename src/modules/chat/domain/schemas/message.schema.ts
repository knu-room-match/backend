import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop({ required: true, unique: true })
  message_id: number;

  @Prop({ required: true, unique: true })
  room_id: number;

  @Prop({ required: true })
  sender_id: number;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
