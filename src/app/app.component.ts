import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private puzzleCreator: PuzzleCreatorService) {
    this.gameState = GameState.Playing;
    this.gameWord = '';
    this.getPuzzleWord$ = new Observable();
  }

  ngOnInit(): void {
    this.puzzleWordCreate();
  }

  ngOnDestroy(): void {

  }

  private puzzleWordCreate(): void {
    this.getPuzzleWord$ = this.puzzleCreator.getPuzzleWord();
    this.getPuzzleWord$.subscribe((response: string) => {
      this.gameWord = response;
    });
  }

  
}
