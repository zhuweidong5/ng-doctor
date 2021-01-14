import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** 引入组件 */
import { PathLibrary } from 'src/core/libs/path-library';
import { MyOrderListComponent } from './my-order-list/my-order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  { path: PathLibrary.orderDetail, component: OrderDetailComponent},
  { path: PathLibrary.myOrderList, component: MyOrderListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
