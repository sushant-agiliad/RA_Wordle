import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuzzleCreatorService {

  constructor() { }

  public getPuzzleWord(): Observable<string> {
    let response = new Observable<string>((observer) => {
      observer.next('India');
    });
    return response;
  }
}
