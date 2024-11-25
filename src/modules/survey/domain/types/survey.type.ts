export type SurveyResponse = {
  surveyId: number;
  answers: AnswerResponse[];
};

export type AnswerResponse = { questionId: number; answer: unknown };

export type Option = {
  label: string;
  value: string | number;
};
