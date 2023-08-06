import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Category } from '../../../../models/category.model';
import { Difficulty } from '../../../../shared/config/difficulty.enum';
import { QuizzMakerForm } from '../../../../models/form/quizz-maker-form';
import { QuizzMakerFormResult } from '../../../../models/form/quizz-maker-form-result';

@Component({
  selector: 'app-quizz-form-generator',
  templateUrl: './quizz-form-generator.component.html',
})
export class QuizzFormGeneratorComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() difficulties: Difficulty[] = [];

  @Output() formCreateQuizzSubmit: EventEmitter<QuizzMakerFormResult> =
    new EventEmitter<QuizzMakerFormResult>();

  defaultCategorySelectLabel: string = 'Select a category';
  defaultDifficultySelectLabel: string = 'Select difficulty';

  quizzMakerForm!: FormGroup<QuizzMakerForm>;

  constructor(private _formBuilder: FormBuilder) {}

  /**
   * On init we fill all forms data
   */
  ngOnInit() {
    this._createForm();
  }

  /**
   * Initialize quizzMakerForm FormControll
   */
  private _createForm() {
    this.quizzMakerForm = this._formBuilder.group({
      categorySelect: new FormControl(-1, {
        nonNullable: true,
        validators: Validators.required,
      }),
      difficultySelect: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
    });
  }
  /**
   * Send the selected value in the form throught the parent
   */
  generateQuizz(): void {
    let resultForm: QuizzMakerFormResult = new QuizzMakerFormResult();
    resultForm.categoryId = this.quizzMakerForm.controls.categorySelect.value;
    resultForm.difficulty = this.quizzMakerForm.controls.difficultySelect.value;
    this.formCreateQuizzSubmit.emit(resultForm);
  }
}
