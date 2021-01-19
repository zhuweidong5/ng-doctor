// import { Injectable } from '@angular/core';
// import COS from "cos-js-sdk-v5";
// import { StorageService } from '@witon/core/system/storage.service';
// import { Subject } from 'rxjs';
// import { DoctorMessageService } from '@witon/core/service/doctor-message.service.js';
// import { RequestService } from '@witon/core/service/request/request.service';
// let TIM: any;
// @Injectable({
//   providedIn: 'root'
// })
// export class WebImService {
//   tim: any; // 腾讯IM的SDK实例

//   // 推送被选中的问诊记录
//   txIMRecord: Subject<any> = new Subject<any>();

//   constructor(
//     private storageSvc: StorageService,
//     private dms: DoctorMessageService,
//     private requestService: RequestService,
//   ) { }

//   private options = {
//     SDKAppID: 1400403892 // 腾讯IM账号生成的AppID
//   };


//   // 模块加载 设置TIM 
//   setTIM(t: any) {
//     TIM = t;

//     console.log('设置 Im', TIM);
    
//   }

//   public initIM() {
//     // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
//     this.tim = TIM.create(this.options);
    
//     // 设置 SDK 日志输出级别
//     this.tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
//     // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
    
//     // 注册 COS SDK 插件
//     this.tim.registerPlugin({'cos-js-sdk': COS});

//     // 收到离线消息和会话列表同步完毕通知
//     this.tim.on(TIM.EVENT.SDK_READY, (event) => {
      
//       console.log(TIM.EVENT.SDK_READY, event);
//     });

//     // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
//     this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, (event) => {
//       // event.data - 存储 Message 对象的数组 - [Message]

//       console.log(TIM.EVENT.MESSAGE_RECEIVED, event);

//       this.dms.setUnreadMsgConunt(event); // 未读消息推送

//       this.txIMRecord.next(event); 
//     });

//     // 收到消息被撤回的通知
//     this.tim.on(TIM.EVENT.MESSAGE_REVOKED, (event) => {
//       // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
      
//       console.log(TIM.EVENT.MESSAGE_REVOKED, event);
//     });

//     // SDK 收到对端已读消息的通知，即已读回执。仅支持单聊会话。
//     this.tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, (event) => {
//       // event.data - event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isPeerRead 属性值为 true
      
//       console.log(TIM.EVENT.MESSAGE_READ_BY_PEER, event);
//     });

//     // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
//     this.tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, (event) => {
//       // event.data - 存储 Conversation 对象的数组 - [Conversation]
      
//       console.log(TIM.EVENT.CONVERSATION_LIST_UPDATED, event);
//     });

//     // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
//     this.tim.on(TIM.EVENT.GROUP_LIST_UPDATED, (event) => {
//       // event.data - 存储 Group 对象的数组 - [Group]
      
//       console.log(TIM.EVENT.GROUP_LIST_UPDATED, event);
//     });

//     // 收到自己或好友的资料变更通知
//     this.tim.on(TIM.EVENT.PROFILE_UPDATED, (event) => {
//       // event.data - 存储 Profile 对象的数组 - [Profile]
      
//       console.log(TIM.EVENT.PROFILE_UPDATED, event);
//     });

//     // 收到黑名单列表更新通知
//     this.tim.on(TIM.EVENT.BLACKLIST_UPDATED, (event) => {
//       // event.data - 存储 userID 的数组 - [userID]
      
//       console.log(TIM.EVENT.BLACKLIST_UPDATED, event);
//     });

//     // 收到 SDK 发生错误通知，可以获取错误码和错误信息
//     this.tim.on(TIM.EVENT.ERROR, (event) => {
//       // event.data.code - 错误码
//       // event.data.message - 错误信息
      
//       console.log(TIM.EVENT.ERROR, event);
//     });

//     // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
//     this.tim.on(TIM.EVENT.SDK_NOT_READY, (event) => {

//       console.log(TIM.EVENT.SDK_NOT_READY, event);
//     });

//     // 收到被踢下线通知
//     this.tim.on(TIM.EVENT.KICKED_OUT, (event) => {
//       // event.data.type - 被踢下线的原因，例如:
//       //    - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
//       //    - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
//       //    - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢 （v2.4.0起支持）。 
      
//       console.log(TIM.EVENT.KICKED_OUT, event);
//     });

//     //  网络状态发生改变
//     this.tim.on(TIM.EVENT.NET_STATE_CHANGE, (event) => { 
//       // event.data.state 当前网络状态，枚举值及说明如下： 
//       //     \- TIM.TYPES.NET_STATE_CONNECTED - 已接入网络 
//       //     \- TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中” 
//       //    \- TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息  
      
//       console.log(TIM.EVENT.NET_STATE_CHANGE, event);
//     });

//   }

//   public login() {
//     if ( this.tim) {
//       const doctorId = this.storageSvc.accessDoctorInfo().doctorId;
//       if (doctorId) {
//         this.requestService.genUserSig(doctorId).subscribe(userObj => {
//           const param = {
//             userID: doctorId,
//             userSig: userObj.sig
//           };
//           this.tim.login(param).then(imRes => {
//             if (imRes.data.repeatLogin) {
//               console.log('重复登录！！！');
//             }
  
//             console.log('login success:::');
//             console.log(imRes);
//           }).catch(imErr => {
//             console.log('login error:', imErr);
//           });
//         });
//       }

//     } else { 
//       // 无实例 重新初始化IM
//       this.initIM();
//       this.login();
//     }
//   }

//   public logout() {
//     if ( this.tim ) {
//       // 登出IM，清除登录态以及内存中的所有数据。
//       this.tim.logout();
//     }
//   }

//   public sendTextMsg(param) {
//     // 创建消息实例，返回的实例
//     let msg = this.tim.createTextMessage({
//       to: param.to,
//       conversationType: TIM.TYPES.CONV_C2C,
//       payload: {
//         text: param.content
//       }
//     });

//     this.sendMsg(msg);
//   }

//   public sendImgMsg(param) {
//     let imgFile = this.url2File(param.content);
//     let msg = this.tim.createImageMessage({
//       to: param.to,
//       conversationType: TIM.TYPES.CONV_C2C,
//       payload: {
//         file: imgFile
//       },
//       onProgress: (event) => { // 上传进度回调
//         console.log('file uploading:', event); 
//       }
//     });

//     this.sendMsg(msg);
//   }

//   private sendMsg(params) {
//     // 发送消息
//     let promise = this.tim.sendMessage(params);

//     promise.then((imResponse) => {
//       // 发送成功
//       console.log(imResponse);
//     }).catch((imError) => {
//       // 发送失败
//       console.warn('sendMessage error:', imError);
//     });
//   }


//   // 将base64转换为File
//   private url2File(dataurl: string): File { 
//     let arr = dataurl.split(',');
//     let mime = arr[0].match(/:(.*?);/)[1];
//     let bstr = atob(arr[1]);
//     let n = bstr.length;
//     let u8arr = new Uint8Array(n);
//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new File([u8arr], 'image.jpg', { type: mime });
//   }

// }
