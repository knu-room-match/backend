import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class SurveyResponse extends Document {
  @Prop({ required: true })
  surveyId: string;

  @Prop({
    type: [
      {
        questionId: String,
        answer: mongoose.Schema.Types.Mixed,
      },
    ],
    required: true,
  })
  answers: Answer[];
}

export const SurveyResponseSchema = SchemaFactory.createForClass(SurveyResponse);

export class Answer {
  @Prop({ required: true })
  questionId: string;

  @Prop({ required: true })
  answer: string | number | boolean | Date;
}
