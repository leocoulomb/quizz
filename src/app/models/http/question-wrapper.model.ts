import { Question } from "../question.model";

export interface QuestionWrapper {
  response_code : number;
  results : Question[]
}
