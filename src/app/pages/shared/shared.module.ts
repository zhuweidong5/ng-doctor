import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';

// 引入自定义过滤器
import { GenderPipe } from './pipe/gender.pipe'; // 年龄过滤

/**
 * 公共-分享
 * 哪个模块需要就在哪个模块引入
 */
@NgModule({
  declarations: [
    GenderPipe,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    GenderPipe,
  ]
})
export class SharedModule { }
