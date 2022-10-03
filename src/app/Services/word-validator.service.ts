import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordValidatorService {

  constructor() { }

  /**
   * Check if the word is valid
   * @param word Input word
   * @returns Observable, true if valid
   */
  public validateWord(word: string): Observable<boolean> {
    let response = new Observable<boolean>((observer) => {
      observer.next(true);
    });
    return response;
  }

  /**
   * Check if character is in recommended range
   * @param character input character
   * @returns True if valid
   */
  validateLetter(character: string): boolean {
    const validInputs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    return validInputs.indexOf(character) > -1;
  }
}
