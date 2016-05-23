<template>
    <form class="full-page">
        <div class="text-field flex-box">
            <i class="fa fa-mobile"></i>
            <input type="text" placeholder="请输入手机号码" v-model="mobile">
            <div class="btn fetch" @click="fetch">获取验证码</div>
        </div>
        <div class="text-field flex-box">
            <i class="fa fa-commenting"></i>
            <input type="text" placeholder="请输入短信验证码" v-model="code" v-el:code>
        </div>
        <div class="error" v-show="error.code">*验证码不正确</div>
        <div class="disclaimer">
            <div class="link">*注册即视为我已阅读并同意《软件注册使用协议》</div>
        </div>
        <div class="text-field password-field">
            <input type="password" placeholder="设置密码(6-12位数字或字母)" v-model="password" v-el:password>
        </div>
        <div class="text-field">
            <input type="password" placeholder="请重复确认密码" v-model="password2" v-el:password2>
        </div>
        <div class="error" v-show="error.unmatch">*两次密码不一致</div>
        <div class="error" v-show="error.password">密码格式不正确</div>
        <div class="page-bottom">
            <div class="btn btn-revert" @click="submit">立即注册</div>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            mobile: '',
            code: '',
            userName: '',
            password: '',
            password2: '',
            error: {
                code: false,
                unmatch: false,
                password: false
            }
        }
    },
    methods: {
        fetch() {
            this.$http.post(this.$root.serverUrl + '/sms', {
                mobile: this.mobile
            }).then(function(res) {
                //{"actionName":"SMS","appId":"Exper","appSecret":"AFDFFDHKDDFJOFFDKLFKFKACMVKKFDFF","status":0,"timeStamp":183727132,"entrySet":[{"mobile":"13760202664","verification":"376274"}],"paramsSet":null}
            });
        },
        validate() {
            this.error.code = this.$els.code.value === '';
            this.error.unmatch = this.$els.password.value !== this.$els.password2.value;
            this.error.password = /^[a-zA-Z0-9]{6,12}$/.test(this.$els.password.value) === false;
            return !(this.error.code || this.error.userName || this.error.unmatch || this.password)
        },
        submit() {
            this.validate();
            this.$http.post(this.$root.serverUrl + '/users', {
                username: this.userName,
                password: this.password
            }).then(function(res) {
                //{"actionName":"AddUserEx","appId":"Exper","appSecret":"AFDFFDHKDDFJOFFDKLFKFKACMVKKFDFF","status":0,"timeStamp":183727132,"entrySet":null,"paramsSet":null}
            });
        }
    }
}
</script>
<style scoped>
    .text-field input:focus {
        border: none;
        -webkit-appearance: none;
    }
    .password-field {
        margin-top: 10px;
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
    .disclaimer {
        padding: 16px;
        background: #fff;
    }
    .link {
        color: #9C9C9C;
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