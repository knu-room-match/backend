import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from '@survey/domain/schemas/survey.schema';
import { SurveyAnswer, SurveyAnswerSchema } from '@survey/domain/schemas/survey-answer.schema';
import { SurveyService } from '@survey/application/service/survey.service';
import { SurveyController } from '@survey/presentation/controller/survey.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Survey.name, schema: SurveySchema }]),
    MongooseModule.forFeature([{ name: SurveyAnswer.name, schema: SurveyAnswerSchema }]),
  ],
  providers: [SurveyService],
  controllers: [SurveyController],
})
export class SurveyModule {}
