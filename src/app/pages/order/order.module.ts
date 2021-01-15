import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';



import { OrderRoutingModule } from './order-routing.module';
import { MyOrderListComponent } from './my-order-list/my-order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  declarations: [MyOrderListComponent, OrderDetailComponent, HomePageComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,

    NzButtonModule,
    NzGridModule
    
  ]
})
export class OrderModule { }
