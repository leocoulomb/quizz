import { FormControl } from '@angular/forms';

export interface QuizzMakerForm {
  categorySelect : FormControl<number>;
  difficultySelect : FormControl<string>;
}
