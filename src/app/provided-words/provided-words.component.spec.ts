import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidedWordsComponent } from './provided-words.component';

describe('ProvidedWordsComponent', () => {
  let component: ProvidedWordsComponent;
  let fixture: ComponentFixture<ProvidedWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidedWordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidedWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
