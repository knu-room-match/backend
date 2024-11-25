import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Option } from './option.schema';

@Schema({ timestamps: true })
export class Survey extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({
    type: [
      {
        questionId: Number,
        questionText: String,
        questionType: String,
        dataType: String,
        options: [{ label: String, value: mongoose.Schema.Types.Mixed }],
      },
    ],
    required: true,
  })
  questions: Question[];
}

export const SurveySchema = SchemaFactory.createForClass(Survey);

export class Question {
  @Prop({ required: true })
  questionId: number;

  @Prop({ required: true })
  questionText: string;

  @Prop({ required: true, enum: ['text', 'radio', 'checkbox', 'range'] })
  questionType: string;

  @Prop({ required: true, enum: ['string', 'number', 'boolean', 'date'] })
  dataType: string;

  @Prop({ type: [{ label: String, value: mongoose.Schema.Types.Number }], default: [] })
  options?: Option[];
}
