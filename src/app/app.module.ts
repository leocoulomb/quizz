import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizzFormGeneratorComponent } from './components/quizz-maker/partials/quizz-form-generator/quizz-form-generator.component';
import { QuizzMakerComponent } from './components/quizz-maker/quizz-maker.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizzDisplayerComponent } from './components/quizz-maker/partials/quizz-displayer/quizz-displayer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnescapePipe } from './shared/pipe/Unescape.pipe';
import { QuizzResultComponent } from './components/quizz-result/quizz-result.component';
import { QuestionsComponent } from './shared/components/questions/questions.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizzMakerComponent,
    QuizzDisplayerComponent,
    QuizzFormGeneratorComponent,
    QuizzResultComponent,
    QuestionsComponent,
    UnescapePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
