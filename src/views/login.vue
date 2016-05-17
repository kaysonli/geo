<template>
    <div class="full-page">
        <img class="logo" src="./resources/images/login.png">
        <div class="text-field">
            <input type="text" placeholder="请输入手机号" v-el:userName>
        </div>
        <div class="text-field">
            <input type="password" placeholder="请输入密码" v-el:password>
        </div>
        <div class="btn" @click="login">登录</div>
        <div class="btn btn-revert" @click="register">注册</div>
        <div class="forgot center" @click="forget">忘记密码</div>
    </div>
</template>

<script>
export default {
    methods: {
        clear() {
            this.$els.username.value = '';
            this.$els.username.focus();
        },
        login() {

        },
        register() {
            this.$router.go('./register');
        },
        forget() {
            this.$router.go('/reset');
        }
    }
}
</script>
<style scoped>
    .full-page {
        background: #fff;
    }
    .logo {
        height: 50%;
    }
    .text-field {
        width: 80%;
        margin: 0 auto;
    }
    .text-field input {
        padding-top: 16px;
        padding-bottom: 16px;
    }
    .forgot {
        color: #A4A4A4;
        margin-top: 16px;
    }
    .btn {
        width: 80%;
        margin-top: 10px;
        margin-bottom: 0;
        height: 47px;
    }
    .btn:active {
        background: #eac600;
    }
    .register {
        color: brown;
    }
</style>