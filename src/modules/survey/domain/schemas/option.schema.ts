import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export class Option {
  @Prop({ required: true })
  label: string;
  @Prop({ required: true })
  value: mongoose.Schema.Types.Mixed;
}
