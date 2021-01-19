// trtc config
export class TrtcConfig {
    streamId: string | undefined; // 视频录制参数
    userId: string | undefined;  // 用户id
    userSig: string | undefined;
    sdkappid!: string; // 密钥
    accountType!: 1; // 随便传一个值，现在没有啥用处
    roomid!: string; // 房间id
}