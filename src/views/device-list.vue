<template>
    <div class="device-list">
        <div class="btn add" @click="addDevice">新建宠管家</div>
        <div class="item-list">
            <div class="item" v-for="dev in devices">
                <div class="map"></div>
                <div class="item-info">
                    <header>
                        <div class="name">{{dev.name}}</div>
                        <div class="battery"><i class="fa fa-battery-2"></i></div>
                    </header>
                    <div class="status">
                        <div v-if="dev.status==='off'" class="off">
                            <i class="fa fa-minus-circle"></i><span>离线</span>
                        </div>
                        <div v-if="dev.status==='on'" class="on">
                            <i class="fa fa-check-circle"></i>
                            <span>在线</span>
                        </div>
                    </div>
                    <div class="location">
                        <i class="fa fa-map-marker"></i>
                        <span>{{dev.location}}</span>
                    </div>
                    <div class="time">
                        <i class="fa fa-clock-o"></i>
                        <span>上次上线：</span>
                        <time>{{dev.lastActive}}</time>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            devices: [{
                name: '黑牛奶',
                status: 'off',
                battery: '50%',
                location: '中国广州越秀区',
                lastActive: '2016-5-15 10:12:20'
            }, {
                name: '哈瑞',
                status: 'on',
                battery: '80%',
                location: '中国深圳南山区',
                lastActive: '2016-5-15 10:12:20'
            }, {
                name: '洛洛',
                status: 'off',
                battery: '5%',
                location: '中国广州越秀区',
                lastActive: '2016-5-15 10:12:20'
            }]
        }
    },
    methods: {
        addDevice() {
            this.$router.go('/add');
        }
    }
}
</script>
<style scoped>
    .add {
        background: #fff;
        height: 40px;
        line-height: 40px;
        width: 80%;
        border-radius: 20px;
        text-align: center;
        margin: 20px auto;
    }

    .item-list {
        background: #ececec;
    }

    .item {
        margin-bottom: 10px;
        background: #fff;
        display: flex;
        padding: 10px;
    }

    .item .map {
        width: 100px;
        margin-right: 10px;
    }

    .item-info {
        flex: 1;
    }

    .item-info header {
        display: flex;
    }

    .name {
        flex: 1;
        font-weight: bold;
        font-size: 20px;
    }

    .battery {
        width: 40px;
    }

    .fa {
        margin-right: 5px;
    }

    .on .fa {
        color: green;
    }
    .off .fa,
    .time {
        color: gray;
    }
</style>