import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_PROVIDEDWORDS } from '../graphql/graphql.queries';

@Component({
  selector: 'app-provided-words',
  templateUrl: './provided-words.component.html',
  styleUrls: ['./provided-words.component.scss']
})
export class ProvidedWordsComponent implements OnInit {
  providedWords: any[] = [];
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_PROVIDEDWORDS
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.providedWords = data.todos;
      this.error = error;
  }
  );
  }
}