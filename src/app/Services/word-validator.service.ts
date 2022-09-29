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
}
