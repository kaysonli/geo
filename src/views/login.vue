<template>
    <div class="login">
        <div class="text-field flex-box">
            <i class="fa fa-user"></i>
            <input type="text">
            <i class="fa fa-remove"></i>
        </div>
        <div class="text-field flex-box">
            <i class="fa fa-lock"></i>
            <input type="text">
            <span class="forgot">忘记密码</span>
        </div>
        <div class="btn">登录</div>
        <div class="register center">没有账户，点击注册</div>
    </div>
</template>

<script>
export default {
    methods: {
        viewList() {
            this.$router.go('/list');
        },
        addDevice() {
            this.$router.go('/add');
        }
    }
}
</script>
<style scoped>
    .text-field {
        margin: 16px;
        border: 1px solid #999;
        border-radius: 20px;
        background: #fff;
        align-items: center;
    }
    .text-field input {
        flex: 1;
        border: none;
        outline: 0;
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
        color: #3BE63B;
        margin-right: 10px;
    }
    .btn {
        background: #3BE63B;
        color: #fff;
    }
    .register {
        color: brown;
    }
</style>