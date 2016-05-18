<template>
    <div class="device-list">
        <div class="btn" @click="addDevice">新建宠觅</div>
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
                "UserName": "",
                "accessId": 1,
                "barcode": "201601140025",
                "devPwd": "",
                "deviceTypeId": 1,
                "dt_expire": "2017-01-01 00:00:00",
                "dt_produce": "2016-01-14 09:52:20",
                "dt_use": "2016-01-14 09:52:20",
                "groupId": 0,
                "id": 33,
                "isDefault": 1,
                "name": "0025",
                "note": "",
                "protoId": 1,
                "sign": "201601140000025",
                "sim": "13534004974",
                "trackId": 1,
                "tryDays": 1000,
                "userId": 1307
            }]
        }
    },
    methods: {
        addDevice() {
            this.$router.go('/add');
        },
        search() {

        },
        goHome() {
            this.$router.go('/home');
        },
        query() {
            this.$http.get(this.$root.serverUrl + '/devices').then(function(res) {
                console.log(res);
                this.devices = res.data.entrySet;
                window.devices = res.data.entrySet;
            }, this);
        },
        updateStatus() {
            var devIds = [];
            this.devices.forEach(function(dev) {
                devIds.push(dev.id);
            });
            this.$http.get(this.$root.serverUrl + '/gps', {
                devIds: devIds
            }).then(function(res) {
                console.log(res);
            }, this);
        }
    },
    ready() {
        document.title = '我的宠觅';
        this.query();
        setInterval(function() {
            this.updateStatus();
        }.bind(this), 10000);
    }
}
</script>
<style scoped>
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