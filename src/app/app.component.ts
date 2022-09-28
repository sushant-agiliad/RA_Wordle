import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { WordComponent } from './Components/word/word.component';
import { Constants, GameState } from './constants';
import { PuzzleCreatorService } from './Services/puzzle-creator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  public title = Constants.APP_NAME;
  public dateTime = new Date();

  public gameWord: string;
  public gameState: GameState;

  private getPuzzleWord$: Observable<string>;

  @ViewChild('word', { static: true }) word!: WordComponent;

  constructor(private puzzleCreator: PuzzleCreatorService) {
    this.gameState = GameState.Playing;
    this.gameWord = '';
    this.getPuzzleWord$ = new Observable();
  }

  ngOnInit(): void {
    this.puzzleWordCreate();

    // Following instructions will be passed by Keyboard component
    this.word.addLetter('A');
    this.word.addLetter('L');
    this.word.addLetter('D');
    this.word.addLetter('E');
    this.word.addLetter('R');
    this.word.wordFinalised()

  }

  ngOnDestroy(): void {

  }

  private puzzleWordCreate(): void {
    this.getPuzzleWord$ = this.puzzleCreator.fetchPuzzleWord();
    this.getPuzzleWord$.subscribe((response: string) => {
      this.gameWord = response;
    });
  }

  
}
