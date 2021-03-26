import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathLibrary } from 'src/core/libs/path-library';
import { LoginComponent } from './pages/home/login/login.component';

const routes: Routes = [

  // 第一个路由就是运行项目默认跳转的页面
  {path: '', redirectTo: PathLibrary.login, pathMatch: 'full'},  

  // 主模块(home)
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },

  {path: '**', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false, // 路由跟踪
      useHash: false
    }
  )],
  exports: [RouterModule],
  providers: [
    DatePipe
  ],
})
export class AppRoutingModule { }
