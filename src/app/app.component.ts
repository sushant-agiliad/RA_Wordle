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
    this.words.forEach((word, index) => {
      word.addLetter(testWords[index].substring(0, 1));
      word.addLetter(testWords[index].substring(1, 2));
      word.addLetter(testWords[index].substring(2, 3));
      word.addLetter(testWords[index].substring(3, 4));
      word.addLetter(testWords[index].substring(4, 5));
      word.wordFinalised()
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
   * Event catcher for WordComponent
   * @param error 
   */
  public errorInputWord(error: string) {
    this.errorMsg = error;
  }
}
