import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRankComponent } from './map-rank.component';

describe('MapRankComponent', () => {
  let component: MapRankComponent;
  let fixture: ComponentFixture<MapRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapRankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
