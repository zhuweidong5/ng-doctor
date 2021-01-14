import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FousComponent } from './fous.component';

describe('FousComponent', () => {
  let component: FousComponent;
  let fixture: ComponentFixture<FousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
