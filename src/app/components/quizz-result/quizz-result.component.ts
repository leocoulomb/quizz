import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnswerDto } from '../../models/dto/answer-dto';
import { QuestionDto } from '../../models/dto/question-dto';
import { QuizzHandlerService } from '../../services/quizz-handler.service';
import { ColorValidAnswerClass } from '../../shared/config/color-valid-answer-class.enum';

@Component({
  selector: 'app-quizz-result',
  templateUrl: './quizz-result.component.html',
})
export class QuizzResultComponent implements OnInit, OnDestroy {

  title: string = 'QUIZZ RESULT';
  countValidAnswer: number = 0;

  questions: QuestionDto[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private _quizzHandlerService: QuizzHandlerService,
    private _router: Router
  ) {}

  /**
   * Destroy all of our current subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
  /**
   * Get answer submited which were stored inside the services
   */
  ngOnInit(): void {
    this.subscriptions.push(
      this._quizzHandlerService
        .getSubmitedAnswer()
        .subscribe((questions: QuestionDto[]) => {
          this._handleSubmitedAnswer(questions);
        })
    );
  }

  /**
   * handle answer stored in the services,
   * if no answer we get back to quizz maker form
   * if there is answer, we calcultate number of right answer and display it
   * @param questions
   */
  private _handleSubmitedAnswer(questions: QuestionDto[]): void {
    if (questions.length === 0) this._navigateToQuizzMaker();
    this.questions = questions;
    this._computeCountValidAnswer();
  }

  /**
   * Get back to quizz maker form
   */
  private _navigateToQuizzMaker(): void {
    this._router.navigate(['/']);
  }

  /**
   * Calculate number of correct answer inside the form submitted
   */
  private _computeCountValidAnswer(): void {
    this.questions.forEach((questions: QuestionDto) => {
      if (
        questions.answers.filter(
          (answer: AnswerDto) => answer.isCorrect && answer.isSelected
        ).length > 0
      )
        this.countValidAnswer++;
    });
  }

  /**
   * css class to apply to the answer count
   * @returns
   */
  getCountValidAnswerClass(): string {
    if (this.countValidAnswer >= 4) return ColorValidAnswerClass.GREEN;
    else if (this.countValidAnswer >= 2) return ColorValidAnswerClass.YELLOW;
    else return ColorValidAnswerClass.RED;
  }
}
