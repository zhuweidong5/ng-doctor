import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathLibrary } from 'src/core/libs/path-library';

// 引入路由
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {path: PathLibrary.map, component: MapComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
