<template>
    <div class="page">
        <div class="input">
            <div class="text-field">
                <i class="fa fa-mobile"></i>
                <input type="text" name="name" placeholder="请输入宠管家昵称">
            </div>
            <div class="imei">
                <span>自动获取到IMEI号:</span>
                <span>{{imei}}</span>
            </div>
        </div>
        <div class="docked-bottom">
            <div class="btn">完成</div>
            <div class="center">如有疑问请咨询：400-155-2158</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imei: '7676 7896 5464 6786'
        }
    },
    methods: {
        goBack() {
            this.$router.go('/add');
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
    .imei {
        color: gray;
        margin-left: 16px;
        margin-top: 15px;
        margin-bottom: 40px;
    }
    .fa {
        font-size: 20px;
    }
    .docked-bottom {
        background: #FEDA00;
        padding-top: 20px;
        padding-bottom: 50px;
    }

    .btn {
        background: #fff;
    }
</style>