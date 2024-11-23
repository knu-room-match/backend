import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class SurveyAnswer extends Document {
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
        options: [{ label: String, value: String }],
      },
    ],
    required: true,
  })
  questions: QuestionResponse[];
}

export const SurveyAnswerSchema = SchemaFactory.createForClass(SurveyAnswer);

export class QuestionResponse {
  @Prop({ required: true })
  questionId: number;

  @Prop({ required: true })
  questionText: string;

  @Prop({ required: true, enum: ['text', 'doubleSlider', 'slider', 'checkbox', 'range'] })
  questionType: string;

  @Prop({ required: true, enum: ['string', 'number'] })
  dataType: string;

  @Prop({ type: [{ label: String, value: mongoose.Schema.Types.Mixed }], default: [] })
  options?: Option[];
}

export class Option {
  @Prop({ required: true })
  label: string;
  @Prop({ required: true })
  value: mongoose.Schema.Types.Mixed;
}
