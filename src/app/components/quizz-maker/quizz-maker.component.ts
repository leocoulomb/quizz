import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../models/category.model';
import { Difficulty } from '../../shared/config/difficulty.enum';
import { Subscription } from 'rxjs';
import { QuizzHandlerService } from '../../services/quizz-handler.service';
import { QuizzMakerFormResult } from '../../models/form/quizz-maker-form-result';
import { QuestionDto } from '../../models/dto/question-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizz-maker',
  templateUrl: './quizz-maker.component.html',
})
export class QuizzMakerComponent implements OnInit, OnDestroy {
  title: string = 'QUIZZ MAKER';

  categories: Category[] = [];
  difficulties: Difficulty[] = [];

  questions: QuestionDto[] = [];

  quizzMakerFormResult?: QuizzMakerFormResult;

  subscriptions: Subscription[] = [];

  constructor(private _quizzHandlerService: QuizzHandlerService, private _router : Router) {}

  /**
   * Destroy all of our current subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }

  /**
   * Load differents data for our form
   */
  ngOnInit() {
    this._loadCategories();
    this._loadDifficulties();
  }
  /**
   * load questions based on a form result
   * @param quizzMakerFormResult
   */
  loadQuizzQuestions(quizzMakerFormResult: QuizzMakerFormResult): void {
    this.subscriptions.push(
      this._quizzHandlerService
        .getFiveMultipleQuestions(
          quizzMakerFormResult.categoryId!,
          quizzMakerFormResult.difficulty!
        )
        .subscribe((questions: QuestionDto[]) => (this.questions = questions))
    );
  }

  /**
   * Set difficulties as all values of our enum Difficulty
   */
  private _loadDifficulties(): void {
    this.difficulties = Object.values(Difficulty);
  }
  /**
   * Get formatted categories from the api
   */
  private _loadCategories(): void {
    this.subscriptions.push(
      this._quizzHandlerService
        .getCategory()
        .subscribe((categories: Category[]) => (this.categories = categories))
    );
  }
  /**
   * We store the result into a subsjet inside our services
   * and we navigate to the result page
   */
  displayResult(): void {
    this._quizzHandlerService.dispatchSubmitedAnswer(this.questions);
    this._router.navigate(['quizz-result']);
  }
}
