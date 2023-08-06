import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnswerDto } from '../../../models/dto/answer-dto';
import { QuestionDto } from '../../../models/dto/question-dto';
import { ColorButonClass } from '../../config/color-buton-class.enum';
import { ClickedAnswerDto } from '../../../models/dto/clicked-answer-dto';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
})
export class QuestionsComponent {
  @Input() isResult: boolean = false;
  @Input() questions: QuestionDto[] = [];
  @Output() answerClicked = new EventEmitter<ClickedAnswerDto>();

  /**
   * get css classes to apply to button based on answer
   * @param answer
   * @returns
   */
  getButtonClass(answer: AnswerDto): string[] {
    let classToApply = [];
    if (this.isResult) classToApply.push('noHover');

    if (
      (!this.isResult && answer.isSelected) ||
      (this.isResult && answer.isCorrect)
    ) {
      classToApply.push(ColorButonClass.ACTIVE);
    }
    if (this.isResult && !answer.isCorrect && answer.isSelected) {
      classToApply.push(ColorButonClass.ERROR);
    }
    return classToApply;
  }

  /**
   * Emit the question and the answer clicked
   * @param question
   * @param answer
   */
  onClickAnswer(question: QuestionDto, answer: AnswerDto): void {
    this.answerClicked.next(new ClickedAnswerDto(answer, question));
  }
}
