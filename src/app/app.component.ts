import { Component, OnDestroy, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KEYVAL_DELETE, KEYVAL_ENTER } from './Components/keyboard/keyboard.component';
import { WordComponent } from './Components/word/word.component';
import { Constants, GameState } from './constants';
import { Letter } from './Model/letter';
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
  public referenceLetters: Array<Letter>;

  @ViewChildren('word') wordElementList!: QueryList<WordComponent>;

  constructor(
    private puzzleCreator: PuzzleCreatorService,
  ) {
    this.gameState = GameState.Playing;
    this.gameWord = '';
    this.referenceLetters = [];
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
    setTimeout(() => {
      let letters = new Array<Letter>;
      this.words.forEach(word => {
        letters.push(...word.letters);
      });
      this.referenceLetters = letters;
    }, 100);

    if (word === this.gameWord.toUpperCase()) {
      this.gameState = GameState.Win;
      this.errorMsg = 'You Won!!!';
    } else {
      this.wordIndex++;
      if (this.wordIndex >= this.words.length) {
        this.gameState = GameState.Out;
        this.errorMsg = 'Out of tries! The Answer is ' + this.gameWord + ". Please refresh and try again!";
      }
    }
  }

  /**
   * Callback for Keyboard component
   * @param key 
   */
  public keyPress(key: string) {
    if (this.gameState == GameState.Playing) {
      this.errorMsg = undefined;
      if (key == KEYVAL_ENTER) {
        this.wordFinalised();
      } else if (key == KEYVAL_DELETE) {
        this.words[this.wordIndex].deleteLastCharacter();
      } else {
        this.addLetterToWord(key);
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
    const wordComponent: WordComponent = this.words[this.wordIndex]
    if (wordComponent.wordCreated.length < Constants.WORD_SIZE) {
      this.errorMsg = 'Please enter 5 letter valid word';
    } else {
      wordComponent.wordFinalised();
    }
  }
}
