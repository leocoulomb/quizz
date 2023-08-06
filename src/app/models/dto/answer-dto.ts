export class AnswerDto {
  label?: string = '';
  isSelected: boolean = false;
  isCorrect: boolean = false;

  constructor(label: string, isCorrect: boolean = false) {
    this.label = label;
    this.isCorrect = isCorrect;
  }

}
