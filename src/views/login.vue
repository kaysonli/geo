<template>
    <div class="login">
        <img class="logo" src="./resources/images/login.png">
        <div class="text-field">
            <input type="text" placeholder="请输入手机号" v-el:userName>
        </div>
        <div class="text-field">
            <input type="password" placeholder="请输入密码" v-el:password>
        </div>
        <div class="btn" @click="login">登录</div>
        <div class="btn" @click="register">注册</div>
        <div class="forgot center">忘记密码</div>
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
        }
    }
}
</script>
<style scoped>
    .login {
        display: flex;
        background: #fff;
        flex-direction: column;
        align-items: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .logo {
        height: 50%;
    }
    .text-field {
        width: 80%;
        padding-left: 0;
        border-bottom: 1px solid #ECECEC;
    }
    .text-field input {
        width: 100%;
        border: none;
        outline: 0;
        font-size: 16px;
    }
    .text-field input:focus {
        border: none;
        -webkit-appearance: none;
    }
    .forgot {
        color: #A4A4A4;
        margin-top: 16px;
    }
    .btn {
        background: #FEDA00;
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