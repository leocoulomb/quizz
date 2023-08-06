import { AnswerDto } from './answer-dto';
import { QuestionDto } from "./question-dto";

export class ClickedAnswerDto {
  answer?: AnswerDto;
  question?: QuestionDto;

  constructor(answer: AnswerDto, question: QuestionDto) {
    this.answer = answer;
    this.question = question;
  }
}
