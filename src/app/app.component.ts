import { Component, OnDestroy, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WordComponent } from './Components/word/word.component';
import { Constants, GameState } from './constants';
import { PuzzleCreatorService } from './Services/puzzle-creator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  public title = Constants.APP_NAME;
  public dateTime = new Date();

  public gameWord: string; // Kept for temporary display in UI
  public gameState: GameState;
  public errorMsg: string | undefined;
  /** Index of words being used currently */
  private wordIndex = 0;

  private getPuzzleWord$: Observable<string>;

  public words: Array<WordComponent> = new Array();

  @ViewChildren('word') wordElementList!: QueryList<WordComponent>;

  constructor(
    private puzzleCreator: PuzzleCreatorService,
  ) {
    this.gameState = GameState.Playing;
    this.gameWord = '';
    this.getPuzzleWord$ = new Observable();
  }

  ngOnInit(): void {
    this.puzzleWordCreate();

  }

  ngAfterViewInit(): void {
    this.wordElementList.forEach((word: WordComponent, i) => {
      this.words.push(word);
    });

    // Following instructions will be passed by Keyboard component

    const testWords = ['Diver', 'China', 'Malai', 'Mario', 'Adale', 'Honda'];
    this.keyALetter(testWords, 0);
  }

  private keyALetter(testWords: string[], letterIndex: number) {
    if (this.gameState == GameState.Playing) {
      setTimeout(() => {
        const letter = testWords[this.wordIndex].substring(letterIndex, letterIndex + 1);
        this.addLetterToWord(letter);
        if (letterIndex == 4) {
          this.wordFinalised();
          this.keyALetter(testWords, 0);
        } else {
          this.keyALetter(testWords, ++letterIndex);
        }
      }, 100);
    }

  }

  ngOnDestroy(): void {

  }

  /**
   * Create puzzle word
   */
  private puzzleWordCreate(): void {
    this.getPuzzleWord$ = this.puzzleCreator.fetchPuzzleWord();
    this.getPuzzleWord$.subscribe((response: string) => {
      this.gameWord = response;
    });
  }

  /**
   * Event catcher for WordComponent
   * @param error 
   */
  public errorInputWord(error: string) {
    this.errorMsg = error;
  }

  /** Add letter to the word */
  public addLetterToWord(character: string): void {
    if (this.gameState == GameState.Playing) {
      this.words[this.wordIndex].addLetter(character);
    }
  }

  /** Backspace operation */
  public deleteLastCharacterFromWord(): void {
    if (this.gameState == GameState.Playing) {
      this.words[this.wordIndex].deleteLastCharacter();
    }
  }

  /** Word is finalised */
  public wordFinalised(): void {
    this.words[this.wordIndex].wordFinalised();
    this.wordIndex++;
    if (this.wordIndex >= this.words.length) {
      this.gameState = GameState.Out;
      this.errorMsg = 'Out of tries, try again';
    }
  }
}
