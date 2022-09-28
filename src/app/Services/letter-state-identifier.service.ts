import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LetterState } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class LetterStateIdentifierService {

  constructor() { }

  public getLetterState(): Observable<LetterState> {
    let response = new Observable<LetterState>((observer) => {
      observer.next(LetterState.White);
    });
    return response;
  }
}
