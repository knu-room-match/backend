import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Question {
  question_id: string;
  question_text: string;
  answer_type: 'multiple-choice' | 'text';
  options?: string[];
}

export interface Response {
  user_id: string;
  answers: { [question_id: string]: any };
}

@Schema()
export class Survey {
  @Prop({ required: true })
  survey_id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [Object], required: true })
  questions: Question[];

  @Prop({ type: [Object], default: [] })
  responses: Response[];

  @Prop({ required: true })
  start_date: Date;

  @Prop({ required: true })
  end_date: Date;
}

export type SurveyDocument = Survey & Document;
export const SurveySchema = SchemaFactory.createForClass(Survey);
