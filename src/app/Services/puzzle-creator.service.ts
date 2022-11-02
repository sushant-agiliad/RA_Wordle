import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { GET_NEWWORD } from '../graphql/graphql.queries';

interface ProvidedWord{
  id : number;
  name : string;
}


@Injectable({
  providedIn: 'root'
})

export class PuzzleCreatorService {

  private puzzleWord: string | undefined;
  private id : number | undefined;

  //constructor() { }
  constructor(private apollo: Apollo) { }
  /**
   * Create puzzle word
   * @returns Observable for Puzzle word string
   */
  public fetchPuzzleWord(): Observable<string> {
    let response = new Observable<string>((observer) => {

      //Added by yap for getting a new word from gql server
      let str = "";
      this.apollo.watchQuery<ProvidedWord>({
          query: GET_NEWWORD
        }).valueChanges.subscribe((result: any) => {
          this.id = result.data.providedWords.id;
          this.puzzleWord = result.data.providedWords.name;
          observer.next(this.puzzleWord);
        });
      
    
      //this.puzzleWord = 'India';
      //observer.next(this.puzzleWord);
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
