// 引入模块
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { OrderRoutingModule } from './order-routing.module';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import  * as TRTC from 'trtc-js-sdk'; // 按模块引入trtc sdk

import { AntDesignModule } from '../../../core/ui/ant-design/ant-design.module';

// 引入组件
import { MyOrderListComponent } from './my-order-list/my-order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { HomePageComponent } from './home-page/home-page.component';

import { VideoIndexService } from '../../../core/service/video/index.service';
import { CrocodileComponent } from './crocodile/crocodile.component';
import { KyleComponent } from './kyle/kyle.component'; // 视频
// import { WebImService } from '../../../core/service/tencent-im/web-im.service'; // 聊天

@NgModule({
  declarations: [MyOrderListComponent, OrderDetailComponent, HomePageComponent, CrocodileComponent, KyleComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    AntDesignModule,

    NzButtonModule,
    NzGridModule,
    NzTableModule,
    NgZorroAntdMobileModule
    
  ]
})
export class OrderModule { 
  constructor(
    private videoIndexService: VideoIndexService, 
    // private webImService: WebImService
  ) {
    this.videoIndexService.setTRTC(TRTC);
    // this.webImService.setTIM(TIM);
  }
}
