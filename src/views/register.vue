<template>
    <div class="register">
        <div class="text-field flex-box">
            <i class="fa fa-phone"></i>
            <input type="text" placeholder="手机号">
            <div class="btn">获取验证码</div>
        </div>
        <div class="disclaimer center">
            <div>*注册即视为我已阅读并同意</div>
            <div class="link">《软件注册使用协议》</div>
        </div>
        <div class="text-field">
            <input type="text" placeholder="请输入验证码" v-el:code>
        </div>
        <div class="text-field">
            <input type="text" placeholder="请输入用户名(4-16位数字或字母)" v-el:username>
        </div>
        <div class="text-field">
            <input type="password" placeholder="请输入密码(6-12位数字或字母)" v-el:password>
        </div>
        <div class="text-field">
            <input type="password2" placeholder="再次输入密码(重复密码)" v-el:password>
        </div>
        <div class="btn">注册</div>
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
    .register {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
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
        display: block;
        width: 80%;
        border: none;
        outline: 0;
        font-size: 16px;
    }
    .text-field input:focus {
        border: none;
        -webkit-appearance: none;
    }
    .btn {
        background: yellowgreen;
        color: #fff;
        width: 80%;
        margin: 16px;
        height: 47px;
    }
    .link {
        color: brown;
    }
</style>