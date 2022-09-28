import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LetterComponent } from './Components/letter/letter.component';
import { WordComponent } from './Components/word/word.component';
import { KeyboardComponent } from './Components/keyboard/keyboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LetterComponent,
    WordComponent,
    KeyboardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
