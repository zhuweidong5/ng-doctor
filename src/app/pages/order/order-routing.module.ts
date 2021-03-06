import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** 引入组件 */
import { PathLibrary } from 'src/core/libs/path-library';
import { MyOrderListComponent } from './my-order-list/my-order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RemoteConsultinfRoomDeactivateGuard } from 'src/core/guard/room-deactivate.guard'; // 路由监听
import { CrocodileComponent } from './crocodile/crocodile.component';
import { KyleComponent } from './kyle/kyle.component';


const routes: Routes = [
  { path: PathLibrary.orderDetail, component: OrderDetailComponent, canDeactivate: [RemoteConsultinfRoomDeactivateGuard]},
  { path: PathLibrary.myOrderList, component: MyOrderListComponent},
  { path: PathLibrary.homepage, component: HomePageComponent},
  { path: PathLibrary.eyu, component: CrocodileComponent},
  { path: PathLibrary.kyle, component: KyleComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
