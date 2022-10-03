import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  @Output() public keyPress = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    document.addEventListener("keyup", (key) => {
      this.keyPress.emit(key.key);
    })
  }

  /** On component click event */
  public keyPressed(key: string) {
    console.log("keyPress", key)
    this.keyPress.emit(key);
  }
}
