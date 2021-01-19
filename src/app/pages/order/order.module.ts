import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { OrderRoutingModule } from './order-routing.module';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import  * as TRTC from 'trtc-js-sdk'; // 按模块引入trtc sdk

// import TIM from "tim-js-sdk";

// import { TRTC } from 'src/core/service/video/js/trtc.js';


import { MyOrderListComponent } from './my-order-list/my-order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { HomePageComponent } from './home-page/home-page.component';

import { VideoIndexService } from '../../../core/service/video/index.service'; // 视频
// import { WebImService } from '../../../core/service/tencent-im/web-im.service'; // 聊天


@NgModule({
  declarations: [MyOrderListComponent, OrderDetailComponent, HomePageComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,

    NzButtonModule,
    NzGridModule,
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
