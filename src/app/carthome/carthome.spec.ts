import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carthome } from './carthome';

describe('Carthome', () => {
  let component: Carthome;
  let fixture: ComponentFixture<Carthome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carthome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carthome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
