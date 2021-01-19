import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { TrtcConfig } from 'src/core/object/trtc/trtc-config.js';
import CreateClientInfo from './interface/create-client-info';
@Injectable({
  providedIn: 'root'
})

// 腾讯trtc 对接
export class VideoIndexService {

  private TRTC: any;
  private LocalStream: any; // 创建一个本地流 Stream 对象，本地流 Stream 对象通过 publish() 方法发布本地音视频流。
  private Client: any; //  创建一个实时音视频通话的客户端对象
  private RemoteStream: any;
  constructor(
  ) { }

  // 创建可观察属性 用于组件交互 --

  // 推送视频结束状态
  videoInquiryType$: BehaviorSubject<number> = new BehaviorSubject<number>(999);

  private localVideoValue = new Subject<any>();      // 本地视频流数据
  private LongRangeVideoValue = new Subject<any>();  // 远程视频流数据
  private quitType = new Subject<any>();             // 退出房间
  private LongRangeVideoValueRemove = new Subject<any>();  // 远程视频流断开
  localVideoValue$ = this.localVideoValue.asObservable();
  LongRangeVideoValue$ = this.LongRangeVideoValue.asObservable();
  LongRangeVideoValueRemove$ = this.LongRangeVideoValueRemove.asObservable();
  quitType$ = this.quitType.asObservable();

  LongRangeVideoValueRemoveMany = new Subject<any>(); // 会诊多人视频远程流监听
  LongRangeVideoValueRemoveMany$ = this.LongRangeVideoValueRemoveMany.asObservable(); // 会诊多人视频远程流监听


  // pc 视频使用
  private videoItem = new Subject<any>();
  videoItem$ = this.videoItem.asObservable();

  private roomNum = [0 , 0];
  roomNumSubject$ = new Subject<Array<number>>();

  // 存储 TRTC 实例
  setTRTC(trtc: any) {
    this.TRTC = trtc;
  }
  

  setVideoItem(item: any) {
    this.videoItem.next(item);
  }

  // 调用TRTC
  openTRTC(config?: any, channel?: string) {

    // 模拟后台返回结果
    // {
    //   "code": 200,
    //   "msg": "success",
    //   "data": {
    //     "sdkAppId": 1400201410,
    //     "loginId": "7d6571570b2248dea33ab14bcf0aec70_doctor",
    //     "loginSign": "eJxNkF9PgzAUxb*K6atGW8qfscQHMowgMidzbvOFlLaw6ga1dIRp-O5Wgsb7dn8n556T*wme7peXhNLmWOtcnyQHUwDBxYAF47UWpeDKQI*5joccDxaWZU8YJxiTAtkFLSHh1IM5a6hu1GglUgqWE51jxf5dbNlbPkiGIRtCCyIb-Yq8l0LxnJR6CMTwzyUqs6c3q1n8OAurbUSOAr*zJMjk0nktN*KZ*uvFQx-3QU*aiNnRnVzPT0FckXSvArTLfAKFuN3uXjZJSPwmzbrVftEdrqIwSuT5nOOP9noM0*Lw8wPkIgSxO-H8kXdctaKpwfQMmNYOskw-M*DrG6yXYSo_",
    //     "roomNumber": 1036034,
    //     "streamId": "4c50f8e9f05343a399c1e0f49fecffc3"
    //   },
    //   "hisErrorCode": null
    // }

    // 默认写死(如果过期了,就去 https://console.cloud.tencent.com/trtc/usersigtool 重新申请一个应用)
    // 目前该(会诊)应用有效期为：有效期：180天 0小时 0分 0秒
    // 过期时间：2021-07-18 15:31:43
    config = {
      streamId: '4c50f8e9f05343a399c1e0f49fecffc3',
      loginId: '7d6571570b2248dea33ab14bcf0aec70_doctor',
      loginSign: 'eJwtzVELgjAUBeD-stdC7ubmNOglkJCSIAt9i7lNGZIzG2VE-z0zH*93OOe*0WmfeQ-doxUiHqDldBulW2cqMzFXAeOYcSgJoaHSwvdFiWkpKxBacrgoK53t5*pdNaLrjEIrTAEoi0IO-0QPnen16IwxAjCrM9efBRgDxQz8ecXU4*dzcGgdqG4TN-mRJDTBu*c2j*1A4qh4tS5jN1rYtE4Xco0*Xy4LOrQ_',
      sdkAppId: 1400459870,
      roomNumber: 1036034,
    }

    let opts = new TrtcConfig();
    opts.streamId = config.streamId,
    opts.userId = config.loginId,
    opts.userSig = config.loginSign,
    opts.sdkappid = config.sdkAppId,
    opts.roomid = config.roomNumber,      // 房间 ID
    this.initTRTC(opts, channel);
  }

  // 初始话创建实例
  initTRTC(opts: TrtcConfig, channel?: string) {

    const createClientInfo = new CreateClientInfo();
    createClientInfo.mode = 'videoCall';
    createClientInfo.streamId = opts.streamId;
    createClientInfo.userId = opts.userId;
    createClientInfo.userSig = opts.userSig;
    createClientInfo.sdkAppId = opts.sdkappid;

    const client = this.Client = this.TRTC.createClient(createClientInfo);

    // 一对多视频
    if (client && channel === '1') {
      this.onRemoteStreamMany(client);    // 调用远程事件监听
      this.clientJoin(client, opts, channel);  // 创建成功- 加入房间
    } else {
    // 一对一视频
      this.onRemoteStream(client);    // 调用远程事件监听
      this.clientJoin(client, opts);  // 创建成功- 加入房间
    }



  }

  // 加入房间
  clientJoin(client: any, opts: TrtcConfig, channel?: string) {

    client.join({ roomId: opts.roomid, role: 'anchor' }).then(() => {

      if (channel && channel === '1') {
        this.localStreamVideoMany();
      } else {
        this.localStreamVideo();
      }

    }).catch((error: string) => {
      alert('Join room failed: ' + error);
      console.error('Join room failed: ' + error);
    });

  }

  // 本地音视频流创建 - join room success 从麦克风和摄像头采集本地音视频流
  localStreamVideo() {

    // 本地视频采集 创建 本地音视频流 facingMode: 'user' 前置摄像头
    const localStream = this.LocalStream = this.TRTC.createStream({ audio: true, video: true, facingMode: 'user' });

    localStream.initialize().catch((error: any) => {

      console.error('failed initialize localStream ' + error);

      // 本地流初始化失败
      switch (error.name) {

        case 'NotReadableError':
          alert('暂时无法访问摄像头/麦克风，请确保当前没有其他应用请求访问摄像头/麦克风，并重试');
          // 提示用户：暂时无法访问摄像头/麦克风，请确保当前没有其他应用请求访问摄像头/麦克风，并重试。
          break;

        case 'NotAllowedError':
          alert('不授权摄像头/麦克风访问无法进行音视频通话');
          // 提示用户：暂时无法访问摄像头/麦克风，请确保当前没有其他应用请求访问摄像头/麦克风，并重试。
          break;

        case 'NotFoundError':
          // 找不到满足请求参数的媒体类型（包括：音频、视频、屏幕分享）。例如：PC 没有摄像头，但是请求浏览器获取视频流，则会报此错误。
          alert('找不到满足请求参数的媒体类型');
          break;

        default:
          console.error(error);
          break;
      }

    }).then(() => {

      // 本地流初始化成功，可通过Client.publish(localStream)发布本地音视频流
      localStream.play('video_grid').then(() => {

        // console.log('-----进行视频标签插入------成功');

        // 本地流成功监听 -
        this.localVideoValue.next(localStream);

        // 推送本地流
        this.Client.publish(localStream);
        this.roomNum[0] = 1;   // 医生进入房间
        this.roomNumSubject$.next(this.roomNum);

      }).catch((e: { getCode: () => any; }) => {

        const errorCode = e.getCode();

        if (errorCode === 0x4043) {
          // PLAY_NOT_ALLOWED,引导用户手势操作恢复音视频播放
          localStream.resume();
        }

      });


    });


  }

  // 远程视频流监听 --
  onRemoteStream(client: any) {

    // 远端流发布
    client.on('stream-added', (event: { stream: any; }) => {

      const remoteStream = event.stream;
      // 若需要观看该远端流，则需要订阅它 订阅远端音频和视频流
      client.subscribe(remoteStream);

      // 若不需要观看该远端流，请取消订阅它，否则SDK会接收远端流数据。
      // client.unsubscribe(remoteStream);
    });


    // 远端流移除事件 监听‘stream-removed’事件
    client.on('stream-removed', (event: { stream: any; }) => {
      const remoteStream = event.stream;
      console.log('远端流移除事件 监听‘stream-removed’事件--------------------------');
      this.roomNum[1] = 0;   // 患者退出房间
      this.roomNumSubject$.next(this.roomNum);
      // 删除远端流 标签
      remoteStream.stop();
      this.LongRangeVideoValueRemove.next(true);
    });


    // 监听‘stream-updated’事件
    client.on('stream-updated', (event: { stream: any; }) => {
      const remoteStream = event.stream;
      console.log('远端数据更新拉-------------------stream-updated------------', remoteStream);
    });


    // 远端流订阅成功，在HTML页面中创建一个<video>标签，假设该标签ID为‘remote-video-view’ 监听‘stream-subscribed’事件 
    client.on('stream-subscribed', (event: { stream: any; }) => {

      console.log(event, '远端流订阅成功，在HTML页面中创建一个远端流订阅成功，在HTML页面中创建一个');
      const remoteStream = this.RemoteStream = event.stream;
      // 播放该远端流
      remoteStream.play('Long');
      this.roomNum[1] = 1;   // 医生进入房间
      this.roomNumSubject$.next(this.roomNum);
      // 远程流数据订阅
      this.LongRangeVideoValue.next(true);

    });


    // 远端用户启用音频通知
    client.on('unmute-audio', (event: any) => {
      console.log('------远端用户启用音频通知');

    });


    client.on('unmute-video', (event: { userId: any; }) => {
      const userId = event.userId;
      console.log('------远端用户视频恢复------------------');
    });

    client.on('peer-leave', (event: { userId: any; }) => {
      const userId = event.userId;
      console.log('------远端用户视频退出------------------');

    });


  }


  // 确定关闭 退出房间
  quitOk() {

    if (this.LocalStream) {
        this.LocalStream.close();
    }

    // 退出房间
    if (this.Client) {

        this.Client.leave().then(() => {

          if(this.roomNum[0] === 1) {
            this.roomNum[0] = 0;   // 医生退出了房间
            this.roomNumSubject$.next(this.roomNum);
          }
    
          // 关闭成功 - 发布状态
          this.quitType.next(false);
    
        }).catch((error: string) => {
          console.error('leaving room failed: ' + error);
        });

    }



  }

  // 关闭摄像头
  cloneVideo() {
    this.LocalStream.muteVideo();
  }

  // 打开摄像头
  startVideo() {
    this.LocalStream.unmuteVideo();
  }

  // 只关闭退出当前房间
  rtcQuit() {

    if (this.LocalStream) {
        this.LocalStream.close();
        // 退出房间
        this.Client.leave().then(() => {
          this.roomNum[0] = 0;   // 医生退出了房间
          this.roomNumSubject$.next(this.roomNum);
          console.log('房间退出成功***********************************');
        }).catch((error: string) => {
          console.error('leaving room failed: ' + error);
        });
    }

  }

  // 关闭音频，远端会收到 ‘mute-audio’ 事件
  muteAudio() {
    this.LocalStream.muteAudio();
  }


  // 启用音频，远端会收到 ‘unmute-audio’ 事件
  unmuteAudio() {
    this.LocalStream.unmuteAudio();
  }

  // 开启/关闭，远端音频
  setAudioVolume(vol?: any) {
    let volume: any;
    if (vol === 0) {
      volume = vol;
    } else {
      volume = this.LocalStream.getAudioLevel(); // 获取音量
    }
    console.log('guan-bi-远端音频yin音量', volume)
    this.LocalStream.setAudioVolume(0.6); // 音量大小，取值在 0.0 (静音) 到 1.0 (最大音量) 之间。
  }

  // 多人会诊-离开房间
  async leaveMany() {
    if (!this.LocalStream) {
      return;
    }
    this.LocalStream.stop();
    this.LocalStream.close();
  }

  // 多人会诊-结束房间
  async endLeaveMany() {
    if (!this.LocalStream) {
      return;
    }
    await this.Client.leave();
    this.LocalStream.stop();
    this.LocalStream.close();
  }

  // 多人会诊远端
  onRemoteStreamMany(client: any) {
    // 远端流发布
    client.on('stream-added', (event: { stream: any; }) => {
      const remoteStream = event.stream;
      client.subscribe(remoteStream);
    });

    // 远端流移除事件 监听‘stream-removed’事件
    client.on('stream-removed', (event: { stream: any; }) => {
      const remoteStream = event.stream;
      remoteStream.stop(); // 删除远端流 标签
    });

    // 监听‘stream-updated’事件
    client.on('stream-updated', (event: { stream: any; }) => {
      const remoteStream = event.stream;
      console.log('远端数据更新拉-------------------stream-updated------------', remoteStream);
    });

    // 远端流订阅成功，在HTML页面中创建一个<video>标签，假设该标签ID为‘remote-video-view’ 监听‘stream-subscribed’事件 
    client.on('stream-subscribed', (event: { stream: any; }) => {
      console.log(event, '远端流订阅成功，在HTML页面中创建一个远端流订阅成功，在HTML页面中创建一个');
      const remoteStream = this.RemoteStream = event.stream;
      // 播放该远端流
      remoteStream.play('Long');
    });
  }

  // 多人会诊本地流
  localStreamVideoMany() {
    // 本地视频采集 创建 本地音视频流 facingMode: 'user' 前置摄像头
    const localStream = this.LocalStream = this.TRTC.createStream({ audio: true, video: true, facingMode: 'user' });
    localStream.initialize().catch((error: any) => {
      console.error('failed initialize localStream ' + error);
      // 本地流初始化失败
      switch (error.name) {
        case 'NotReadableError':
          alert('暂时无法访问摄像头/麦克风，请确保当前没有其他应用请求访问摄像头/麦克风，并重试');
          // 提示用户：暂时无法访问摄像头/麦克风，请确保当前没有其他应用请求访问摄像头/麦克风，并重试。
          break;
        case 'NotAllowedError':
          alert('不授权摄像头/麦克风访问无法进行音视频通话');
          // 提示用户：暂时无法访问摄像头/麦克风，请确保当前没有其他应用请求访问摄像头/麦克风，并重试。
          break;
        case 'NotFoundError':
          // 找不到满足请求参数的媒体类型（包括：音频、视频、屏幕分享）。例如：PC 没有摄像头，但是请求浏览器获取视频流，则会报此错误。
          alert('找不到满足请求参数的媒体类型');
          break;
        default:
          console.error(error);
          break;
      }
    }).then(() => {
      // 本地流初始化成功，可通过Client.publish(localStream)发布本地音视频流
      localStream.play('video_grid').then(() => {
        // 本地流成功监听 -
        this.LongRangeVideoValueRemoveMany.next(localStream);
        // 推送本地流
        this.Client.publish(localStream);
      }).catch((e: { getCode: () => any; }) => {
        const errorCode = e.getCode();
        if (errorCode === 0x4043) {
          localStream.resume();
        }
      });
    });

  }

  


 


}
