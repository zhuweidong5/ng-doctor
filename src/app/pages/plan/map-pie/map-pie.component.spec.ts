import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPieComponent } from './map-pie.component';

describe('MapPieComponent', () => {
  let component: MapPieComponent;
  let fixture: ComponentFixture<MapPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
