import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { GET_ISVALIDWORD } from '../graphql/graphql.queries';

@Injectable({
  providedIn: 'root'
})
export class WordValidatorService {

  constructor(private apollo: Apollo) { }

  /**
   * Check if the word is valid
   * @param word Input word
   * @returns Observable, true if valid
   */
  public validateWord(word: string): Observable<boolean> {
    let response = new Observable<boolean>((observer) => {
      this.apollo.watchQuery<Boolean>({
        query: GET_ISVALIDWORD,
        variables: {
          word: word,
        },
      }).valueChanges.subscribe((result: any) => {
        observer.next(result.data.validWord);
      });
      //observer.next(true);
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
