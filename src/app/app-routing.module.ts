import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzMakerComponent } from './components/quizz-maker/quizz-maker.component';
import { QuizzResultComponent } from './components/quizz-result/quizz-result.component';

const routes: Routes = [
  {path: '', component : QuizzMakerComponent},
  {path: 'quizz-maker', component : QuizzMakerComponent},
  {path: 'quizz-result', component : QuizzResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
