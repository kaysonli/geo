<template>
    <div class="login">
        <img class="logo" src="./resources/images/logo.png">
        <div class="text-field flex-box">
            <i class="fa fa-user"></i>
            <input type="text" v-el:userName>
            <i class="fa fa-remove" @click="clear"></i>
        </div>
        <div class="text-field flex-box">
            <i class="fa fa-lock"></i>
            <input type="password">
            <span class="forgot">忘记密码</span>
        </div>
        <div class="btn">登录</div>
        <div class="register center">没有账户，点击注册</div>
    </div>
</template>

<script>
export default {
    methods: {
        clear() {
            this.$els.username.value = '';
            this.$els.username.focus();
        }
    }
}
</script>
<style scoped>
    .login {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .logo {
        margin-top: 50px;
        margin-bottom: 50px;
    }
    .text-field {
        margin: 16px;
        border: 1px solid #999;
        border-radius: 20px;
        background: #fff;
        align-items: center;
        width: 80%;
        height: 50px;
        /*box-sizing: border-box;*/
    }
    .text-field input {
        flex: 1;
        border: none;
        outline: 0;
        font-size: 16px;
    }
    .text-field input:focus {
        border: none;
        -webkit-appearance: none;
    }
    .fa {
        font-size: 20px;
    }
    .fa-remove {
        width: 30px;
    }
    .forgot {
        color: yellowgreen;
        margin-right: 10px;
        white-space: nowrap;
    }
    .btn {
        background: yellowgreen;
        color: #fff;
        width: 80%;
        margin: 16px;
        height: 47px;
    }
    .register {
        color: brown;
    }
</style>