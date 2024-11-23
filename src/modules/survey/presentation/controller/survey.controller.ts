import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SurveyService } from '@survey/application/service/survey.service';
import { SurveyAnswerRequest } from '@survey/application/dto/survey-request.dto';
import { ResponseEntity } from '@common/dto/response-entity.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findSurveyRecently() {
    const foundSurvey = await this.surveyService.findOneSurveyRecently();
    return ResponseEntity.success(foundSurvey, '조회 완료');
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async submitSurveyAnswer(@Body() surveyAnswerRequest: SurveyAnswerRequest) {
    const createdSurveyAnswer = await this.surveyService.submitAnswer(surveyAnswerRequest);
    return ResponseEntity.success(createdSurveyAnswer, '생성 응답 완성');
  }
  /**\
   * TODO: userId 주입 받아서 해야함.
   */
  @Get('/answer')
  @HttpCode(HttpStatus.OK)
  async findSurveyResponse() {
    const foundSurvey = await this.surveyService.findOneSurveyResponse();
    return ResponseEntity.success(foundSurvey, '조회 완료');
  }
}
