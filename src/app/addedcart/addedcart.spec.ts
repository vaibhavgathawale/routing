import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addedcart } from './addedcart';

describe('Addedcart', () => {
  let component: Addedcart;
  let fixture: ComponentFixture<Addedcart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addedcart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addedcart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
