

// 对象字段定义
export enum videoRemindText {
    videoClosureRemind = "videoClosureRemind",
    videoRemindJoin = "videoRemindJoin",
    videoClosureSourceNum = "videoClosureSourceNum",
    pendingvideoClosureRemind = "pendingvideoClosureRemind",
    closeVideoType= "closeVideoType",
    videoClosureInquiry = 'videoClosureInquiry'
  }
  
  // 医生视频通知患者参数定义
export enum videoRemindObject {
      videoClosureRemind = "医生结束了视频通话！videoClosureRemind",
      pendingvideoClosureRemind = "医生挂起了视频通话！videoClosureRemind",
      videoClosureSourceNum = "医生为你重新分配了号源！videoClosureRemind",
      videoRemindJoin = "医生向你发起了视频通话！videoRemindJoin",
      closeVideoType = "患者挂断了视频通话！closeVideoType",
      videoClosureInquiry = "问诊已结束！videoClosureInquiry"
  }



export interface VideoRemindInterface {
    videoClosureRemind: string;
    videoRemindJoin: string;
  }

