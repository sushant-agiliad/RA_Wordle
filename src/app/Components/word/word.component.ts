import { Component, OnInit } from '@angular/core';
import { LetterState } from '../../../app/constants';
import { Letter } from '../../../app/Model/letter';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  /** Created word - value holder */
  private _wordCreated: string | undefined;

  /** Created word, value available after complete word is created */
  public get wordCreated(): string | undefined {
    return this._wordCreated;
  }

  public letters: Array<Letter>;
  private letterIndex: number;

  constructor() {
    this.letters = [];
    this.letterIndex = 0;
  }

  ngOnInit(): void {
    this.resetWord();
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
      })
    }
  }

  /**
   * Add letter to the word
   * @param character character to be added
   */
  public addLetter(character: string): void {
    if (character && character.length > 1 && this.letterIndex < this.letters.length) {
      this.letters[this.letterIndex].character = character.substring(0, 1);
      this.letterIndex++;
    }
  }

  /**
   * Word is finalised
   */
  public wordFinalised(): void {
    var word = '';
    for (let i = 0; i < this.letters.length; i++) {
      word = word + this.letters[i].character;
    }
    this._wordCreated = word;
  }

  /**
   * Backspace operation
   */
  public deleteLastCharacter(): void {
    this.letters[this.letterIndex].character = undefined;
    this.letterIndex--;
  }
}
