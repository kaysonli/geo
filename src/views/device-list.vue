<template>
    <div class="device-list" v-el:container>
        <div class="btn" v-touch:tap="addDevice">新建宠觅</div>
        <div class="item-list">
            <div class="item" v-for="dev in devices" 
                v-bind:class="{'removing': dev.removing}"
                v-touch:tap="viewDeviceInfo(dev, $event)" v-touch:swipe="onSwipe(dev, $event)">
                <div class="map" id="map-{{dev.id}}"></div>
                <div class="item-info">
                    <header>
                        <div class="name">{{dev.name}}</div>
                        <div class="battery"><i class="fa fa-battery-{{dev.power | battery}}"></i></div>
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
                    <div class="location flex-box">
                        <i class="fa fa-map-marker"></i>
                        <span>{{dev.location}}</span>
                    </div>
                    <div class="time">
                        <i class="fa fa-clock-o"></i>
                        <span>上次上线：</span>
                        <time>{{dev.gps.dt_gps}}</time>
                    </div>
                </div>
                <div class="btn-remove" v-touch:tap.stop="removeDevice(dev, $index)">
                    <span>删除设备</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            maps: {},
            devices: [/*{
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
            }*/]
        }
    },
    route: {
        data(transition) {
            this.queryDevices();
            // setInterval(function() {
            //     this.queryGPS();
            // }.bind(this), 10000);
        }
    },
    events: {
        
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
        onSwipe(dev, evt) {
            dev.removing = evt.direction === 2;
        },
        viewDeviceInfo(dev, evt) {
            this.$root.currentDevice = dev;
            this.$router.go({
                name: 'device-info',
                params: {
                    id: dev.id,
                    device: dev
                }
            });
        },
        removeDevice(dev, index) {
            this.devices.splice(index, 1);
        },
        queryDevices() {
            this.$http.get(this.$root.serverUrl + '/devices').then(function(res) {
                console.log(res);
                if(res.data.status === -1) {
                    this.$router.go('/login');
                    return;
                }
                var devices = [];
                if(res.data.entrySet) {
                    res.data.entrySet.forEach(function(dev) {
                        devices.push(dev);
                        dev.gps = {};
                        dev.location = '';
                        dev.power = 0;
                        dev.removing = false;
                    });
                }
                this.devices = devices;
                this.$root.devices = devices;
                this.queryGPS();
            }, this);
        },
        queryGPS() {
            var devIds = [];
            this.devices.forEach(function(dev) {
                devIds.push(dev.id);
            });
            this.$http.get(this.$root.serverUrl + '/gps', {
                devIds: devIds
            }).then(function(res) {
                this.updateStatus(res.data.entrySet);
                setTimeout(function() {
                    this.initMaps();
                }.bind(this), 0);
            }, this);
        },
        updateStatus(gpsInfo) {
            var devMap = {};
            gpsInfo.forEach(function(gps) {
                devMap[gps.devId] = gps;
            });
            this.devices.forEach(function(dev) {
                dev.gps = devMap[dev.id];
            });
        },
        initMaps() {
            this.devices.forEach(function(dev) {
                 var content = document.createElement('div');
                content.innerHTML = '';
                content.className = 'map-marker';
                var id = 'map-' + dev.id;
                var el = document.getElementById(id);
                if(!this.maps[id]) {
                    this.maps[id] = new AMap.Map(el, {
                        zoom: 12,
                        center: [dev.gps.lng, dev.gps.lat]
                    });
                    var marker = new AMap.Marker({
                        position: [dev.gps.lng, dev.gps.lat],
                        color: 'red',
                        // content: content,
                        map: this.maps[id]
                    });
                }
                this.maps[id].setCenter([dev.gps.lng, dev.gps.lat]);
                AMap.service('AMap.Geocoder',function() {//回调函数
                    //实例化Geocoder
                    var geocoder = new AMap.Geocoder();
                    //TODO: 使用geocoder 对象完成相关功能
                    var lnglatXY = [dev.gps.lng, dev.gps.lat];//地图上所标点的坐标
                    geocoder.getAddress(lnglatXY, function(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            var address = result.regeocode.addressComponent;
                            var full = address.province + address.district + address.township + address.street + address.streetNumber;
                            dev.location = full;
                        } else {
                           //获取地址失败
                        }
                    }); 
                });
            }, this);
        }
    },
    ready() {
        document.title = '我的宠觅';
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
        height: 150px;
        transition: left 0.2s;
        position: relative;
        left: 0;
    }

    .item .map {
        width: 100px;
        margin-right: 10px;
    }

    .item-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
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
    .location .fa,
    .time {
        color: gray;
    }
    
    .item.removing {
        left: -120px;
    }
    .btn-remove {
        position: absolute;
        width: 120px;
        right: -240px;
        top: 0;
        height: 100%;
        background: #FEDA00;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: right 0.2s;
    }
    .removing .btn-remove {
        right: -120px;
    }
</style>