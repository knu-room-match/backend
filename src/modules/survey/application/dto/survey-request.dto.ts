export class SurveyAnswerRequest {
  title: string;
  description?: string;
  questions: Question[];
}

export class Question {
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
