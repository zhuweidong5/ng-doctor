import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { VideoIndexService } from 'src/core/service/video/index.service';
import { ModalService, ToastService } from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.less']
})
export class OrderDetailComponent implements OnInit {
  timerSubscription: Subscription | undefined; // 定时器
  timerSubscriptionEndStatus: Subscription | undefined; // 定时器-结束

  constructor(
    private videoIndexService: VideoIndexService,
    private el: ElementRef,
    private modalService: ModalService

  ) { }

  ngOnInit(): void {

    // 处理被邀请人视频样式
    this.timerSubscription = timer(500, 1000).subscribe(() => {
      let manyInvited = this.el.nativeElement.querySelector('.Long');
      if (manyInvited.getElementsByTagName('div').length > 0) {
        manyInvited.getElementsByTagName('div').forEach((ele: { style: { width: string; height: string; margin: string; }; }) => {
          ele.style.width = '200px';
          ele.style.height = '300px';
          ele.style.margin = '20px';
        })
      }
    });

    // 监测远程流结束-查询会诊详情
    this.timerSubscriptionEndStatus = timer(500, 2000).subscribe(() => {
      // 调接口
    })

  }


  // 加入房间
  join() {
    let res = {};
    this.videoIndexService.openTRTC(res, '1'); // 打开视频
  }


  // 路由监听
  CanDeactivate(): Observable<boolean> {
    debugger
    const hasRoomParam = true; 
    return new Observable(
      observer => {
        if ( hasRoomParam) {
          debugger
          this.modalService.alert('', '你有正在进行的会诊,确定要离开吗？', [
            { text: '取消', onPress: () => {
              observer.next(false);
            } },
            { text: '确定', onPress: () => {
              this.videoIndexService.endLeaveMany(); // 确定退出房间
              observer.next(true);
            } }
          ]);
        } else {
          observer.next(true);
        }
      }
    );
  }



   // 组件销毁
  ngOnDestroy(): void {
    // 找到元素后清除定时器(需要组件销毁时在清除)
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); 
    }

    // 清除结束状态
    if (this.timerSubscriptionEndStatus) {
      this.timerSubscriptionEndStatus.unsubscribe(); 
      console.log('结束的定时器被清除了')
    }
  }
  

}
