import { Injectable } from '@angular/core';
import { QuizzHttpService } from './http/quizz-http.service';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryWrapper } from '../models/http/category-wrapper.model';
import { QuestionDto } from '../models/dto/question-dto';
import { OPENTDB_API_FIVE_QUESTIONS, OPENTDB_API_TYPE_MULTIPLE } from '../shared/config/global.constants';
import { QuestionWrapper } from '../models/http/question-wrapper.model';
import { Question } from '../models/question.model';
import { AnswerDto } from '../models/dto/answer-dto';

@Injectable({
  providedIn: 'root',
})
export class QuizzHandlerService {
  constructor(private _quizzHttp: QuizzHttpService) {}

  //Handle the submited answer from a the creation form
  //used to pass data throught component withtout using router state
  submitedAnswer: BehaviorSubject<QuestionDto[]> = new BehaviorSubject<
    QuestionDto[]
  >([]);

  /**
   * Make the call to the http service to build the request to the API to have categories
   * @returns
   */
  getCategory(): Observable<Category[]> {
    return this._quizzHttp.getCategory().pipe(
      take(1),
      map((category: CategoryWrapper) => category.trivia_categories)
    );
  }
  /**
   * Make the call to the http service to build the request to the API to have questions
   * @param categoryId
   * @param difficulty
   * @returns
   */
  getFiveMultipleQuestions(
    categoryId: number,
    difficulty: string
  ): Observable<QuestionDto[]> {
    return this._formatQuizzQuestions(
      this._quizzHttp.getQuestions(
        OPENTDB_API_FIVE_QUESTIONS,
        categoryId,
        difficulty,
        OPENTDB_API_TYPE_MULTIPLE
      )
    ).pipe(take(1));
  }

  /**
   * Transform the http response into an array of QuestionDTO
   * @param questionsWrapperObs
   * @returns
   */
  private _formatQuizzQuestions(
    questionsWrapperObs: Observable<QuestionWrapper>
  ): Observable<QuestionDto[]> {
    return questionsWrapperObs.pipe(
      map((questions: QuestionWrapper) =>
        questions.results.map((question: Question) =>
          this._mapQuestionToQuestionDto(question)
        )
      )
    );
  }
  /**
   * Build a questionDTO from a question coming from API
   * @param question
   * @returns
   */
  private _mapQuestionToQuestionDto(question: Question): QuestionDto {
    let answers: AnswerDto[] = [];
    answers = [
      new AnswerDto(question.correct_answer, true),
      ...question.incorrect_answers.map(
        (label: string) => new AnswerDto(label)
      ),
    ];
    //Shuffle array
    answers = answers.sort(() => Math.random() - 0.5);
    return new QuestionDto(question.question, answers);
  }

  /**
   * Access submitedAnswer value as an observable
   * @returns
   */
  getSubmitedAnswer(): Observable<QuestionDto[]> {
    return this.submitedAnswer.asObservable();
  }

  /**
   * Push a new value to submitAnswer
   * @param questions
   */
  dispatchSubmitedAnswer(questions: QuestionDto[]): void {
    this.submitedAnswer.next(questions);
  }
}
