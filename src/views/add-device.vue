<template>
    <div class="page">
        <header class="nav-bar">
            <div class="nav-menu-left" @click="goHome">
                <i class="fa fa-caret-left"></i>
            </div>
            <div class="title">新建宠管家</div>
        </header>
        <div class="hint">
            <div class="hint-text">
                <div class="center">找出宠管家背面的二维码</div>
                <div class="center">扫描后即可自动对接</div>
            </div>
        </div>
        <div class="btn" @click="scan">立即扫描二维码</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        goHome() {
            this.$router.go('/home');
        },
        scan() {
            wx.scanQRCode({
              needResult: 1,
              desc: 'scanQRCode desc',
              success: function (res) {
                alert(JSON.stringify(res));
              }
            });
            // this.$router.go('/input');
        }
    }
}
</script>
<style scoped>
    .nav-menu-left {
        float: left;
        width: 24px;
    }
    .page {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
    }
    .hint {
        height: 60%;
        background: #fff;
        color: gray;
        position: relative;
    }
    .hint-text {
        position: absolute;
        bottom: 20%;
        width: 100%;
    }
    .btn {
        background: yellow;
    }
</style>