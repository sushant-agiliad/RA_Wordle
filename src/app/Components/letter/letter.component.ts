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

  private _active: boolean;

  /** On active state, letter will subscribe to colour change */
  @Input() public set active(value: boolean) {
    this._active = value;
    if (value) {
      this.getState();
    } else {
      this.letter.state = LetterState.White;
    }
  }

  public get active(): boolean {
    return this._active;
  }

  /** Main value holder */
  @Input() public letter: Letter;

  /** Default value for Letter.character */
  @Input() public value: string | undefined;

  private letterStateIdentifier$: Observable<LetterState>;

  constructor(
    private letterStateIdentifier: LetterStateIdentifierService,
  ) {
    this._active = false;
    this.letter = {
      character: undefined,
      state: LetterState.White,
      index: -1,
    }
    this.letterStateIdentifier$ = new Observable();
  }

  ngOnInit(): void {
    if (this.value) {
      this.letter.character = this.value;
    }
  }

  /** Subscribe for state change */
  private getState() {
    this.letterStateIdentifier$ = this.letterStateIdentifier.getLetterState(this.letter);
    this.letterStateIdentifier$.subscribe((response: LetterState) => {
      this.letter.state = response;
    })
  }

  ngOnDestroy(): void {

  }
}
