import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WordValidatorService } from '../../../app/Services/word-validator.service';
import { LetterState } from '../../../app/constants';
import { Letter } from '../../../app/Model/letter';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  /** True when word is finalised */
  public active: boolean;

  public letters: Array<Letter>;
  private letterIndex: number;

  @Output() public errorInput = new EventEmitter<string>();
  @Output() public validInput = new EventEmitter<string>();

  constructor(
    private wordValidatorService: WordValidatorService
  ) {
    this.letters = [];
    this.letterIndex = 0;
    this.active = false;
    this.resetWord();
  }

  ngOnInit(): void {
  }

  /** Created word */
  public get wordCreated(): string {
    let word = '';
    this.letters.forEach((letter: Letter) => {
      if (letter.character) {
        word += letter.character
      }
    });
    return word;
  }

  /**
   * Initialize / Reset letters in word
   * @param size Default value 5
   */
  public resetWord(size = 5) {
    this.letters = [];
    for (let i = 0; i < size; i++) {
      this.letters.push({
        character: undefined,
        state: LetterState.White,
        index: i,
      });
    }
  }

  /**
   * Add letter to the word
   * @param character character to be added
   */
  public addLetter(character: string): void {
    if (character && character.length > 0 && this.letterIndex < this.letters.length) {
      const char = character.toUpperCase().substring(0, 1);
      if (this.wordValidatorService.validateLetter(char)) {
        this.letters[this.letterIndex].character = char;
        this.letterIndex++;
      }
    }
  }

  /**
   * To be called when the word is finalised
   */
  public wordFinalised(): void {
    var word = '';
    for (let i = 0; i < this.letters.length; i++) {
      word = word + this.letters[i].character;
    }

    this.wordValidatorService.validateWord(word).subscribe((response: boolean) => {
      if (response) {
        this.active = true;
        this.validInput.emit(word);
      } else {
        this.errorInput.emit('Invalid input word, please try a valid word!');
      }
    })
  }

  /**
   * Backspace operation
   */
  public deleteLastCharacter(): void {
    if (this.letterIndex > 0) {
      this.letters[--this.letterIndex].character = undefined;
    }
  }
}
