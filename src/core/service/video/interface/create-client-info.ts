
// trtc 加入房间入参
export default class CreateClientInfo {
    mode: string | undefined; // 应用场景，目前支持以下两种场景：   
    streamId: string | undefined; // 绑定腾讯云直播 CDN 流 ID，设置之后，您就可以在腾讯云直播 CDN 上通过标准直播方案（FLV|HLS）播放该用户的音视频流。 限制长度为64字节，可以不填写，一种推荐的方案是使用 “sdkappid_roomid_userid_main” 作为 streamid，这样比较好辨认且不会在您的多个应用中发生冲突。
    userId: string | undefined; // 用户ID
    userSig: string | undefined; // userSig 签名
    sdkAppId: string | undefined; // sdkAppId
}