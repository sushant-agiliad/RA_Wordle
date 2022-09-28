import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LetterState } from '../constants';
import { Letter } from '../Model/letter';
import { PuzzleCreatorService } from './puzzle-creator.service';

@Injectable({
  providedIn: 'root'
})
export class LetterStateIdentifierService {

  constructor(
    private puzzleCreatorService: PuzzleCreatorService,
  ) { }

  public getLetterState(letter: Letter): Observable<LetterState> {
    let response = new Observable<LetterState>((observer) => {
      const puzzleWord = this.puzzleCreatorService.getPuzzleWord();
      if (puzzleWord && letter.character) {
        if (letter.index < puzzleWord.length) {
          const character: string = letter.character ? letter.character.toUpperCase() : '';
          if (character === puzzleWord.toUpperCase().substring(letter.index, letter.index + 1)) {
            observer.next(LetterState.Green);
          } else {
            if (puzzleWord.toUpperCase().indexOf(character) > -1) {
              observer.next(LetterState.Yellow);
            } else {
              observer.next(LetterState.Grey);
            }
          }
        } else {
          observer.next(LetterState.White);
        }
      } else {
        observer.next(LetterState.White);
      }
    });
    return response;
  }
}
