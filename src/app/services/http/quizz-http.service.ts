import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryWrapper } from '../../models/http/category-wrapper.model';
import { QuestionWrapper } from '../../models/http/question-wrapper.model';

@Injectable({
  providedIn: 'root',
})
export class QuizzHttpService {
  constructor(private _http: HttpClient) {}

  /**
   * Htttp call to the api to extract categories
   * @returns
   */
  getCategory(): Observable<CategoryWrapper> {
    return this._http.get<CategoryWrapper>(
      'https://opentdb.com/api_category.php'
    );
  }
  /**
   * Http call to the api to extract questions
   * @param amount
   * @param categoryId
   * @param difficulty
   * @param type
   * @returns
   */
  getQuestions(
    amount: number,
    categoryId: number,
    difficulty: string,
    type: string
  ): Observable<QuestionWrapper> {
    return this._http.get<QuestionWrapper>(
      `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=${type}`
    );
  }
}
