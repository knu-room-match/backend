import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Survey } from '../schemas/survey.schema';
import { Model } from 'mongoose';
import { SurveyAnswerRequest } from '../dto/survey-request.dto';
import { SurveyAnswer } from '../schemas/survey-answer.schema';
import { SurveyAnswerResponse } from '../dto/survey-response.dto';

@Injectable()
export class SurveyService {
  constructor(
    @InjectModel(Survey.name)
    private readonly surveyModel: Model<Survey>,
    @InjectModel(SurveyAnswer.name)
    private readonly surveyAnswerModel: Model<SurveyAnswer>,
  ) {}

  async generateSurvey(title, description, questions) {
    const survey = new this.surveyModel({ title, description, questions });
    const savedSurvey = await survey.save();
    return savedSurvey;
  }

  async findOneSurveyRecently() {
    const survey = await this.surveyModel.findOne().sort({ createdAt: -1 }).limit(1).exec();
    return survey;
  }

  async findAllSurvey() {
    return await this.surveyModel.find().exec();
  }

  async submitAnswer({ title, description, questions }: SurveyAnswerRequest) {
    const surveyAnswer = new this.surveyAnswerModel({ title, description, questions });
    const savedSurveyAnswer = await surveyAnswer.save();
    return SurveyAnswerResponse.of(savedSurveyAnswer);
  }
  async findOneSurveyResponse() {
    return await this.surveyAnswerModel.findOne().exec();
  }
}
