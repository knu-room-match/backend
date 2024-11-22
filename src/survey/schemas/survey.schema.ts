import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Survey extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({
    type: [
      { questionText: String, questionType: String, dataType: String, options: [{ label: String, value: String }] },
    ],
    required: true,
  })
  questions: Question[];
}

export const SurveySchema = SchemaFactory.createForClass(Survey);

export class Question {
  @Prop({ required: true })
  questionText: string;

  @Prop({ required: true, enum: ['text', 'radio', 'checkbox', 'range'] })
  questionType: string;

  @Prop({ required: true, enum: ['string', 'number', 'boolean', 'date'] })
  dataType: string;

  @Prop({ type: [{ label: String, value: String }], default: [] })
  options?: Option[];
}

export class Option {
  @Prop({ required: true })
  label: string;
  @Prop({ required: true })
  value: string;
}
