import { Component, OnDestroy, OnInit, ViewChildren, QueryList, AfterViewInit, HostListener } from '@angular/core';
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
  public totalWords = Constants.TOTAL_WORDS;
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
  }

  ngOnDestroy(): void {

  }

  @HostListener('document:keypress', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent) {
    if (this.gameState == GameState.Playing) {
      this.errorMsg = undefined;
      const key = event.key;
      if (key == 'Enter') {
        this.wordFinalised();
      } else {
        this.addLetterToWord(key);
      }
    }
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
   * Event catcher from WordComponent on invalid word input
   * @param error 
   */
  public errorInputWord(error: string) {
    this.errorMsg = error;
  }

  /**
   * Event catcher from WordComponent on valid input
   * @param word created word
   */
  public validInputWord(word: string) {
    if (word === this.gameWord.toUpperCase()) {
      this.gameState = GameState.Win;
      this.errorMsg = 'You got it';
    } else {
      this.wordIndex++;
      if (this.wordIndex >= this.words.length) {
        this.gameState = GameState.Out;
        this.errorMsg = 'Out of tries, try again';
      }
    }
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
    if (this.words[this.wordIndex].wordCreated.length < Constants.WORD_SIZE) {
      this.errorMsg = 'Please enter 5 letter valid word';
    } else {
      this.words[this.wordIndex].wordFinalised();
    }
  }
}
