import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuzzleCreatorService {

  private puzzleWord: string | undefined;

  constructor() { }

  /**
   * Create puzzle word
   * @returns Observable for Puzzle word string
   */
  public fetchPuzzleWord(): Observable<string> {
    let response = new Observable<string>((observer) => {
      this.puzzleWord = 'India';
      observer.next(this.puzzleWord);
    });
    return response;
  }

  /**
   * get created puzzle word
   * @returns Puzzle word string
   */
  public getPuzzleWord(): string | undefined {
    return this.puzzleWord;
  }
}
