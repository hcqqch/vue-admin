<template>
    <div></div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        linkry() {
            var appkey = "kj29chm026yyn";
            RongIMLib.RongIMClient.init(appkey);
            
            RongIMClient.setConnectionStatusListener({
          
                onChanged: function(status) {
                    // status 标识当前连接状态
                    switch (status) {
                        case RongIMLib.ConnectionStatus.CONNECTED:
                            console.log("链接成功");
                            break;
                        case RongIMLib.ConnectionStatus.CONNECTING:
                            console.log("正在链接");
                            break;
                        case RongIMLib.ConnectionStatus.DISCONNECTED:
                            console.log("断开连接");
                            break;
                        case RongIMLib.ConnectionStatus
                            .KICKED_OFFLINE_BY_OTHER_CLIENT:
                            console.log("其他设备登录, 本端被踢");
                            break;
                        case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                            console.log(
                                "域名不正确, 请至开发者后台查看安全域名配置"
                            );
                            break;
                        case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                            console.log(
                                "网络不可用, 此时可调用 reconnect 进行重连"
                            );
                            break;
                        default:
                            console.log("链接状态为", status);
                            break;
                    }
                }
            });

            RongIMClient.setConnectionStatusListener({
                
            })
        }
    },
    mounted() {
        this.linkry();
    }
};
</script>