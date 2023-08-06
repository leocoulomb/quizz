import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { QuestionDto } from '../../../../models/dto/question-dto';
import { ClickedAnswerDto } from '../../../../models/dto/clicked-answer-dto';

@Component({
  selector: 'app-quizz-displayer',
  templateUrl: './quizz-displayer.component.html',
})
export class QuizzDisplayerComponent implements OnInit{
  @Input() questions: QuestionDto[] = [];
  @Output() formQuizzDoneSubmit: EventEmitter<undefined> =
    new EventEmitter<undefined>();

  //Set of question selected
  //used to know when all questions has been answered
  questionsSelected: Set<string> = new Set<string>();

  ngOnInit(): void {
    this.questionsSelected = new Set<string>();
  }

  /**
   * On click event on an answer we sett is property selected to true
   * and we push the question in the set of questionsSelected
   * @param event
   */
  selectAnswer(event : ClickedAnswerDto): void {
    event.question!.unselectAllAnswers();
    event.answer!.isSelected = true;
    this.questionsSelected.add(event.question!.label);
  }


  /**
   * notify parent that submit button has been clicked
   */
  submitQuizzAnswers(): void {
    this.formQuizzDoneSubmit.emit();
  }
}
