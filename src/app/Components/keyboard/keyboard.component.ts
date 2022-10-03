import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.addEventListener("keyup", (e) => {
        alert(e.code);
    })
  }

}
