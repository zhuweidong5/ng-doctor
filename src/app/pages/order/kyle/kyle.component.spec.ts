import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KyleComponent } from './kyle.component';

describe('KyleComponent', () => {
  let component: KyleComponent;
  let fixture: ComponentFixture<KyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KyleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
