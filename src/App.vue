<template>
  <div>
    <router-view></router-view>
    <div class="loading-mask" v-show="state.loading"></div>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import Group from 'vux/components/group'
import Cell from 'vux/components/cell'
import DateTime from 'vux/components/datetime'
import global from './global'
import store from './vuex/store'

export default {
  components: {
    Hello, Group, Cell, DateTime
  },
  store: store,
  data() {
    return {
      state: global.state,
      serverUrl: ''
    }
  },
  methods: {
    
  },
  ready() {
    console.log('App ready');
      /*
       * 注意：
       * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
       * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
       * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
       *
       * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
       * 邮箱地址：weixin-open@qq.com
       * 邮件主题：【微信JS-SDK反馈】具体问题
       * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
       */
      wx.config({
          debug: false,
          appId: 'wxf8b4f85f3a794e77',
          timestamp: 1464053651,
          nonceStr: 'Uan7eEuN6d06bdDf',
          signature: '5b74bb8affb108e5039df60d122357d4cf8a2841',
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
          ]
      });
  }
}
</script>

<style>
html, body {
  height: 100%;
}
#app {
  height: 100%;
}
body {
  font-family: 微软雅黑, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
}
.btn {
  height: 47px;
  line-height: 47px;
  width: 80%;
  border-radius: 20px;
  text-align: center;
  background: #FEDA00;
  margin: 20px auto;
}
.btn-revert {
  background: #fff;
  border: 1px solid #ececec;
}
.nav-bar {
  height: 45px;
  line-height: 45px;
}
.flex-box {
  display: flex;
}
.flex-item-fill {
  flex: 1;
}
.nav-bar .title {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}
.nav-bar{
  padding: 0 10px;
}
.nav-bar .fa {
  
}
.center {
  text-align: center;
}

.text-field {
    margin-bottom: 0;
    border-bottom: 1px solid #ececec;
    background: #fff;
    align-items: center;
}
.text-field input {
    display: block;
    width: 90%;
    padding-left: 0;
    padding-right: 0;
    border: none;
    outline: 0;
    padding: 26px 16px;
    font-size: 16px;
}
.text-field input:focus {
    border: none;
    -webkit-appearance: none;
}
.text-field input.icon {
    padding-left: 30px;
    margin-left: 12px;
}
.icon-mobile {
    background: url(/resources/images/phone_ico.jpg) no-repeat 0;
}
.icon-code {
    background: url(/resources/images/duanxin_ico.jpg) no-repeat 0;
}

.page-bottom {
  flex: 1;
  background: #FEDA00;
}
.page-bottom .btn {
    margin-top: 30px;
}

.full-page {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
  .amap-touch-toolbar .amap-zoomcontrol {
      bottom: 140px;
  }
  .loading-mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10000;
    opacity: 0.4;
    background: #ececec url(/resources/images/loading.gif) no-repeat center;
  }
</style>
