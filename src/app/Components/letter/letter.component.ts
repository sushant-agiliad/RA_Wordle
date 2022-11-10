import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { LetterState } from '../../../app/constants';
import { Letter } from '../../../app/Model/letter';
import { LetterStateIdentifierService } from '../../../app/Services/letter-state-identifier.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
  animations: [
    trigger('activator', [
      state('Start', style({
        opacity: 0.5,
        backgroundColor: 'red',
        transform: 'rotate(10deg) rotateY(180deg)'
      })),
      state('Animate', style({
        opacity: 0.5,
        backgroundColor: 'pink',
        transform: 'none'
      })),
      state('Close', style({
        opacity: 1,
        transform: 'none'
      })),
      transition('Start => Animate', [
        animate('0.3s')
      ]),
      transition('Animate => Close', [
        animate('0.5s')
      ]),
      transition('Close => Start', [
        animate('0.1s')
      ]),
    ]),
  ]
})

export class LetterComponent implements OnInit, OnDestroy {

  private _active: boolean;
  public animate: AnimationState;

  /** On active state, letter will subscribe to colour change */
  @Input() public set active(value: boolean) {
    this._active = value;
    if (value) {
      this.animate = AnimationState.Start;
      setTimeout(() => {
        this.animate = AnimationState.Animate;
        setTimeout(() => {
          this.animate = AnimationState.Close;
        }, 300);
      }, 100);
    }
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

  @Output() public keyPress = new EventEmitter<string>();
  @Output() public activated = new EventEmitter<LetterState>();

  private letterStateIdentifier$: Observable<LetterState>;

  constructor(
    private letterStateIdentifier: LetterStateIdentifierService,
  ) {
    this._active = false;
    this.animate = AnimationState.Close;
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
      this.activated.emit(response);
    })
  }

  ngOnDestroy(): void {

  }

  /** On component click event */
  public onClick(event: Event) {
    this.keyPress.emit(this.letter.character);
  }
}

/** Enum providing the states of Animation */
enum AnimationState {
  Start = 'Start',
  Animate = 'Animate',
  /** Default state */
  Close = 'Close'
}
