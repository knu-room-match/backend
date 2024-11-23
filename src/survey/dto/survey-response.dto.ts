import { SurveyAnswer } from '../schemas/survey-answer.schema';

export class SurveyAnswerResponse {
  _id: string;
  title: string;
  description?: string;
  questions: QuestionResponse[];
  constructor(_id, title, description, questions) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.questions = questions;
  }

  static of({ _id, title, description, questions }: SurveyAnswer) {
    return new SurveyAnswerResponse(_id, title, description, questions);
  }
}

export class QuestionResponse {
  questionId: number;
  questionText: string;
  questionType: string;
  dataType: string;
  options?: Option[];
}

export class Option {
  label: string;
  value: string | number;
}
