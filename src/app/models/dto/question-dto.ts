import { AnswerDto } from "./answer-dto";

export class QuestionDto {
  label: string;
  answers: AnswerDto[];

  constructor(label: string, answers: AnswerDto[]) {
    this.label = label;
    this.answers = answers;
  }

  unselectAllAnswers(): void {
    this.answers.forEach((answer: AnswerDto) => (answer.isSelected = false));
  }
}
