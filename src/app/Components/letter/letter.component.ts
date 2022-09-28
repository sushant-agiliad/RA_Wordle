import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LetterState } from '../../../app/constants';
import { Letter } from '../../../app/Model/letter';
import { LetterStateIdentifierService } from '../../../app/Services/letter-state-identifier.service';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss']
})
export class LetterComponent implements OnInit, OnDestroy {

  @Input() public letter: Letter;
  private letterStateIdentifier$: Observable<LetterState>;

  constructor(
    private letterStateIdentifier: LetterStateIdentifierService,
  ) {
    this.letter = {
      character: undefined,
      state: LetterState.White
    }
    this.letterStateIdentifier$ = new Observable();
  }

  ngOnInit(): void {
    this.letterStateIdentifier$ = this.letterStateIdentifier.getLetterState();
    this.letterStateIdentifier$.subscribe((response: LetterState) => {
      this.letter.state = response;
    })
  }

  ngOnDestroy(): void {

  }
}
