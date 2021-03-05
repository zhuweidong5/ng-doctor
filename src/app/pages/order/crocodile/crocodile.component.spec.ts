import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrocodileComponent } from './crocodile.component';

describe('CrocodileComponent', () => {
  let component: CrocodileComponent;
  let fixture: ComponentFixture<CrocodileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrocodileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrocodileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
