import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { MapComponent } from './map/map.component';
import { MapChartComponent } from './map-chart/map-chart.component';
import { MapRankComponent } from './map-rank/map-rank.component';
import { MapPieComponent } from './map-pie/map-pie.component';


@NgModule({
  declarations: [MapComponent, MapChartComponent, MapRankComponent, MapPieComponent],
  imports: [
    CommonModule,
    PlanRoutingModule
  ]
})
export class PlanModule { }
