<template>
    <div class="page">
        
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
        background: yellow;
        padding-top: 20px;
        padding-bottom: 50px;
    }

    .btn {
        background: #fff;
    }
</style>