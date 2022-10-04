import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { LetterState } from 'src/app/constants';
import { Letter } from 'src/app/Model/letter';
import { LetterComponent } from '../letter/letter.component';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit, AfterViewInit {

  @Input() public set referenceLetters(value: Array<Letter>) {
    this.resetLetterStates(value);
  }

  @Output() public keyPress = new EventEmitter<string>();

  @ViewChild('enter') letterEnter!: LetterComponent;
  @ViewChild('del') letterDel!: LetterComponent;
  @ViewChildren('letter') letterElements!: QueryList<LetterComponent>

  private letterComponents: Array<LetterComponent>

  constructor() {
    this.letterComponents = [];
    this.referenceLetters = [];
  }

  ngOnInit(): void {
    document.addEventListener("keyup", (key) => {
      this.keyPress.emit(key.key);
    })
  }

  ngAfterViewInit(): void {
    this.letterElements.forEach((letter: LetterComponent, i) => {
      this.letterComponents.push(letter);
    });
  }

  /**
   * Reset state of all letters
   * @param value array of possible letters
   */
  private resetLetterStates(letters: Letter[]): void {
    this.letterComponents.forEach((letterComponent => {
      let state = LetterState.White;
      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        if (letter.character === letterComponent.letter.character) {
          if (letter.state == LetterState.Grey && state == LetterState.White) {
            state = letter.state;
          } else if (letter.state == LetterState.Yellow) {
            state = letter.state;
          } else if (letter.state == LetterState.Green) {
            state = letter.state;
            break;
          }
        }
      }
      letterComponent.letter.state = state;
    }))
  }

  /** On component click event */
  public keyPressed(key: string) {
    this.keyPress.emit(key);
  }
}
