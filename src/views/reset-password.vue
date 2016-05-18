<template>
    <form class="full-page">
        <div class="text-field flex-box">
            <i class="fa fa-mobile"></i>
            <input type="text" placeholder="请输入手机号码">
            <div class="btn fetch" @click="fetch">获取验证码</div>
        </div>
        <div class="text-field flex-box">
            <i class="fa fa-commenting"></i>
            <input type="text" placeholder="请输入短信验证码" v-el:code>
        </div>
        <div class="error" v-show="error.code">*验证码不正确</div>
        <div class="page-bottom">
            <div class="btn btn-revert" @click="next">下一步</div>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            error: {
                code: false
            }
        }
    },
    methods: {
        fetch() {

        },
        validate() {
            this.error.code = this.$els.code.value === '';
            return !this.error.code
        },
        next() {
            this.validate();
            this.$router.go('/reset/new');
        }
    },
    ready() {
        document.title = '找回密码';
    }
}
</script>
<style scoped>
    .password-field {
        margin-top: 15px;
    }
    .btn {
        width: 85%;
    }
    .btn:active {
        background: #eee;
    }
    .btn.fetch:active {
        background: #eac600;
    }
    .btn.fetch {
        background: #FEDA00;
        border-radius: 5px;
        height: 35px;
        line-height: 35px;
        width: 150px;
        margin: 0;
        margin-right: 10px;
    }
    .error {
        margin-left: 20px;
        color: red;
    }
    .fa {
        color: #DEDEDE;
        margin-left: 16px;
    }
</style>