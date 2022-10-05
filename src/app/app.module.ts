import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LetterComponent } from './Components/letter/letter.component';
import { WordComponent } from './Components/word/word.component';
import { KeyboardComponent } from './Components/keyboard/keyboard.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ProvidedWordsComponent } from './provided-words/provided-words.component';

@NgModule({
  declarations: [
    AppComponent,
    LetterComponent,
    WordComponent,
    KeyboardComponent,
    ProvidedWordsComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
