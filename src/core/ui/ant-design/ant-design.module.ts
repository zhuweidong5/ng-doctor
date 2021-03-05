import { NgModule } from '@angular/core';
// import { NgZorroAntdModule, NZ_I18N, zh_CN, NzSpinModule } from "ng-zorro-antd";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { registerLocaleData } from "@angular/common";
// import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import zh from "@angular/common/locales/zh";
// import { NzPopoverModule } from 'ng-zorro-antd/popover';

registerLocaleData(zh);

@NgModule({
  
  declarations: [],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    // NgZorroAntdModule,
    // NzPopoverModule,
    NzInputModule,
    NzTableModule,
    // NzSpinModule,
    // NzTimelineModule,
    NzButtonModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    // NgZorroAntdModule,
    // NzPopoverModule,
    NzInputModule,
    NzTableModule,
    // NzSpinModule,
    NzIconModule,
    // NzTimelineModule,
  ],
  // providers: [{ provide: NZ_I18N, useValue: zh_CN }]
  providers: []
})
export class AntDesignModule { }
