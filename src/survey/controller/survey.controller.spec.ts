import { Test, TestingModule } from '@nestjs/testing';
import { SurveyController } from './survey.controller';
import { SurveyService } from '../service/survey.service';
import { SurveyAnswerRequest } from '../dto/survey-request.dto';
import { ResponseEntity } from '../../common/dto/response-entity.dto';
import { SurveyAnswerResponse } from '../dto/survey-response.dto';

describe('SurveyController', () => {
  let controller: SurveyController;
  let service: SurveyService;

  beforeEach(async () => {
    const serviceMock = {
      findOneSurveyRecently: jest.fn(),
      submitAnswer: jest.mock<SurveyAnswerResponse>,
      findOneSurveyResponse: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyController],
      providers: [{ provide: SurveyService, useValue: serviceMock }],
    }).compile();

    controller = module.get<SurveyController>(SurveyController);
    service = module.get<SurveyService>(SurveyService);
  });

  it('정의되어 있어야 한다', () => {
    expect(controller).toBeDefined();
  });

  describe('findSurveyRecently', () => {
    it('최근 설문을 조회해야 한다', async () => {
      const mockSurvey = { id: 1, title: '테스트 설문', questions: jest.fn() };
      service.findOneSurveyRecently = jest.fn().mockResolvedValue(mockSurvey);

      const result = await controller.findSurveyRecently();

      expect(service.findOneSurveyRecently).toHaveBeenCalled();
      expect(result).toEqual(ResponseEntity.success(mockSurvey, '조회 완료'));
    });
  });

  describe('submitSurveyAnswer', () => {
    it('설문 응답을 제출해야 한다', async () => {
      const surveyAnswerRequest: SurveyAnswerRequest = {
        title: 'test',
        description: 'test',
        questions: [
          {
            questionId: 1,
            questionText: 'test-question-slider',
            questionType: 'slider',
            dataType: 'number',
            options: [
              {
                value: 3,
                label: 'label3',
              },
            ],
          },
          {
            questionId: 2,
            questionText: 'test-question-checkbox',
            questionType: 'checkbox',
            dataType: 'number',
            options: [
              {
                label: 'label1',
                value: 'value1',
              },
              {
                label: 'label2',
                value: 'value2',
              },
            ],
          },
          {
            questionId: 3,
            questionText: 'test-question-selector',
            questionType: 'selector',
            dataType: 'number',
            options: [
              {
                label: 'label_2',
                value: 'value2',
              },
            ],
          },
          {
            questionId: 4,
            questionText: 'test-question-doubleSlider',
            questionType: 'doubleSlider',
            dataType: 'number',
            options: [
              {
                label: 'label2',
                value: 2,
              },
              {
                label: 'label5',
                value: 5,
              },
            ],
          },
        ],
      };
      const mockResponse: SurveyAnswerResponse = { _id: 'uuid', ...surveyAnswerRequest };
      service.submitAnswer = jest.fn().mockResolvedValue(mockResponse);
      const result = await controller.submitSurveyAnswer(surveyAnswerRequest);

      expect(service.submitAnswer).toHaveBeenCalledWith(surveyAnswerRequest);
      expect(result).toEqual(ResponseEntity.success(mockResponse, '생성 응답 완성'));
    });
  });

  describe('findSurveyResponse', () => {
    it('설문 응답을 조회해야 한다', async () => {
      const mockSurveyResponse: SurveyAnswerRequest = {
        title: 'test',
        description: 'test',
        questions: [
          {
            questionId: 1,
            questionText: 'test-question-slider',
            questionType: 'slider',
            dataType: 'number',
            options: [
              {
                value: 3,
                label: 'label3',
              },
            ],
          },
          {
            questionId: 2,
            questionText: 'test-question-checkbox',
            questionType: 'checkbox',
            dataType: 'number',
            options: [
              {
                label: 'label1',
                value: 'value1',
              },
              {
                label: 'label2',
                value: 'value2',
              },
            ],
          },
          {
            questionId: 3,
            questionText: 'test-question-selector',
            questionType: 'selector',
            dataType: 'number',
            options: [
              {
                label: 'label_2',
                value: 'value2',
              },
            ],
          },
          {
            questionId: 4,
            questionText: 'test-question-doubleSlider',
            questionType: 'doubleSlider',
            dataType: 'number',
            options: [
              {
                label: 'label2',
                value: 2,
              },
              {
                label: 'label5',
                value: 5,
              },
            ],
          },
        ],
      };
      service.findOneSurveyResponse = jest.fn().mockResolvedValue(mockSurveyResponse);

      const result = await controller.findSurveyResponse();

      expect(service.findOneSurveyResponse).toHaveBeenCalled();
      expect(result).toEqual(ResponseEntity.success(mockSurveyResponse, '조회 완료'));
    });
  });
});
