import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathLibrary } from 'src/core/libs/path-library';

const routes: Routes = [
  {path: '', redirectTo: PathLibrary.login, pathMatch: 'full'},

  // 主模块(home)
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
