<template>
    <form class="full-page">
        <div class="text-field password-field">
            <input type="password" placeholder="请输入密码" v-el:password>
        </div>
        <div class="text-field">
            <input type="password" placeholder="请重复确认密码" v-el:password2>
        </div>
        <div class="error" v-show="error.unmatch">*两次密码不一致</div>
        <div class="error" v-show="error.password">密码格式不正确</div>
        <div class="page-bottom">
            <div class="btn btn-revert" @click="submit">完成</div>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            error: {
                unmatch: false,
                password: false
            }
        }
    },
    methods: {
        validate() {
            this.error.unmatch = this.$els.password.value !== this.$els.password2.value;
            this.error.password = /^[a-zA-Z0-9]{6,12}$/.test(this.$els.password.value) === false;
            return !(this.error.unmatch || this.password)
        },
        submit() {
            this.validate();
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
    }
</style>