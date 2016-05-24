<template>
    <div class="full-page">
        <header class="toolbar flex-box">
            <div class="tool" v-touch:tap="setRegion">
                <div class="fa fa-map-signs"></div>
                <div class="tool-text">围栏</div>
            </div>
            <div class="tool" v-touch:tap="viewPath">
                <div class="fa fa-paw"></div>
                <div class="tool-text">轨迹</div>
            </div>
            <div class="tool" v-touch:tap="viewAlarms">
                <div class="fa fa-warning"></div>
                <div class="tool-text">报警</div>
            </div>
            <div class="tool" :class="{active: tab === 'gps'}">
                <div class="fa fa-map-marker"></div>
                <div class="tool-text">实时定位</div>
            </div>
            <div class="tool" v-touch:tap="configure">
                <div class="fa fa-gear"></div>
                <div class="tool-text">设置</div>
            </div>
        </header>
        <router-view></router-view>
        <main>
            <div class="map" v-el:map></div>
            <div class="locate" v-touch:tap="setCenter">
            </div>
        </main>
        <footer class="map-views flex-box">
            <div v-for="item in mapViews" class="map-view" 
            @click="setView($index)"
            v-bind:class="{'active': ($index === active)}">{{item}}</div>
        </footer>
    </div>
</template>

<script>
import utils from './../utils.js';
export default {
    props: {
        devId: {
            type: Number
        },
        location: {
            type: Array
        }
    },
    route: {
        data(transition) {
            console.log(this.trackLine)
             setTimeout(function() {
                var devices = this.devices || this.$root.devices;
                if(devices) {
                    var current = this.getCurrentDevice(devices);
                    if(!current) {
                        this.$router.go('/devices');
                        return;
                    }
                    if(this.map) {
                        this.map.setCenter([current.gps.lng, current.gps.lat]);
                    } else {
                        this.initMap(current);
                    }
                } else {
                    this.queryDevices();
                }
            }.bind(this), 0);
            // transition.next();
        }
    },
    data() {
        return {
            active: 1,
            rangeTab: 0,
            editing: false,
            mapViews: ['卫星图', '2D平面图', '3D俯视图'],
            map: null,
            mouseTool: null,
            satelliteLayer: null
        }
    },
    events: {
        'draw-start': function() {
            this.drawPolygon();
        },
        'draw-complete': function() {
            if(!this.mouseTool) {
                return;
            }
            var polygon = this.map.getAllOverlays('polygon')[0];
            var points = [];
            if(polygon) {
                var path = polygon.getPath();
                path.forEach(function(node) {
                    points.push([node.getLng(), node.getLat()]);
                });
            }
            this.mouseTool.close(true);
        },
        'draw-cancel': function() {
            if(this.mouseTool) {
                this.mouseTool.close(true);
            }
        },
        'set-radius': function(radius) {
            this.drawCircle(radius);
        },
        'timerange': function(range) {
            history.go(-1);
            var format = 'Y-m-d H:i:s';
            var start = utils.dateFormat(new Date(range.from), format);
            var end = utils.dateFormat(new Date(range.to), format);
            this.getHistoryGPS(this.$route.params.id, start, end);
            var lineArr = [ [ 114.050751, 22.666425 ], [ 114.066887, 22.645197 ], [ 114.05899, 22.611923 ], [ 114.024315, 22.588151 ], [ 113.992729, 22.599879 ], [ 113.992729, 22.633156 ], [ 114.050751, 22.666425 ] ];
            // this.drawPath(lineArr);
        }
    },
    methods: {
        setCenter() {
            var dev = this.getCurrentDevice(this.devices || this.$root.devices);
            this.map.setCenter([dev.gps.lng, dev.gps.lat]);
        },
        setRegion() {
            if(this.trackLine) {
                this.trackLine.setMap(null);
            }
            this.$router.go(this.$route.path + '/range');
        },
        viewPath() {
            this.$router.go(this.$route.path + '/track');
        },
        viewAlarms() {
            this.$router.go('/warnings/' + this.$route.params.id);
        },
        configure() {
            this.$router.go('/settings');
        },
        setView(index) {
            this.active = index;
            if(index === 0) {
                this.satelliteLayer.show();
            } else {
                this.satelliteLayer.hide();
            }
        },
        goBack() {
            this.$router.go('/add');
        },
        drawCircle(radius) {
            if(!this.circle) {
                this.circle = new AMap.Circle({
                    center: this.map.getCenter(),
                    radius: radius, //半径
                    strokeColor: "#ececec", //线颜色
                    strokeOpacity: 1, //线透明度
                    strokeWeight: 0, //线粗细度
                    fillColor: "#333", //填充颜色
                    fillOpacity: 0.45//填充透明度
                });
                this.circle.setMap(this.map);
            } else {
                this.circle.setRadius(radius);
            }
        },
        drawPolygon() {
            var map = this.map;
            map.plugin(["AMap.MouseTool"], function() {
                var mouseTool = this.mouseTool = new AMap.MouseTool(map);
                mouseTool.polygon({
                    fillOpacity: 0,
                    strokeColor: '#f00',
                    fillColor: '#fff'
                });
            }.bind(this));
            AMap.event.addListener(map, 'draw', function(data) {
                console.log(data);
            }, this);
        },
        drawPath(lineArr) {
            if(!this.trackLine) {
                this.trackLine = new AMap.Polyline({
                    path: lineArr,          //设置线覆盖物路径
                    strokeColor: "#f00", //线颜色#FEDA00
                    strokeOpacity: 1,       //线透明度
                    strokeWeight: 2,        //线宽
                    strokeStyle: "solid",   //线样式
                    strokeDasharray: [10, 5] //补充线样式
                });
            }
            this.trackLine.setMap(this.map);
            this.trackLine.setPath(lineArr);
        },
        initMap(dev) {
            var center = [dev.gps.lng, dev.gps.lat];
            var map = this.map = new AMap.Map(this.$els.map, {
                zoom: 14,
                center: center
            });
            var marker = new AMap.Marker({
                position: center,
                icon: '/resources/images/map_fanwei.png'
            });
            marker.setMap(map);
            var satellite = this.satelliteLayer = new AMap.TileLayer.Satellite();
            satellite.setMap(this.map);
            satellite.hide();
            map.plugin(["AMap.ToolBar"],function(){
                //加载工具条
                var tool = new AMap.ToolBar({
                    // offset: new AMap.Pixel(100,100)
                });
                map.addControl(tool);   
            });
        },
        clearLayers() {
            if(this.trackLine) {
                this.trackLine.setMap(null);
            }
            if(this.circle) {
                this.circle.setMap(null);
            }
        },
        getHistoryGPS(devId, start, end) {
            this.$http.get(this.$root.serverUrl + '/tracks/' + devId, {
                start: start, 
                end: end
            }).then(function(res) {
                if(res.data.status === -1) {
                    this.$router.go('/login');
                    return;
                }
                var path = [];
                if(res.data.entrySet) {
                    res.data.entrySet.forEach(function(point) {
                        path.push([point.lng, point.lat]);
                    });
                }
                this.drawPath(path);
            }, this);
        },
        queryDevices() {
            this.$http.get(this.$root.serverUrl + '/devices').then(function(res) {
                console.log(res);
                if(res.data.status === -1) {
                    this.$router.go('/login');
                    return;
                }
                var devices = [];
                res.data.entrySet.forEach(function(dev) {
                    devices.push(dev);
                    dev.gps = {};
                    dev.location = '';
                    dev.power = 0;
                    dev.removing = false;
                });
                this.devices = devices;
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
                    var current = this.getCurrentDevice(this.devices);
                    if(!current) {
                        this.$router.go('/devices');
                    } else {
                        this.initMap(current);
                    }
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
        getCurrentDevice(devices) {
            var current = null;
            for(var i = 0; i < devices.length; i++) {
                if(devices[i].id === +this.$route.params.id) {
                    current = devices[i];
                    break;
                }
            }
            return current;
        }
    },
    ready() {
        console.log('device ready');
    }
}
</script>
<style scoped>
    .toolbar,
    .map-views {
        background: #fff;
        opacity: 0.9;
        position: fixed;
        width: 100%;
    }
    .toolbar {
        height: 50px;
        align-items: center;
        justify-content: space-around;
        z-index: 1;
    }
    .tool {
        flex: 1;
        text-align: center;
        height: 100%;
        margin-top: 5px;
    }
    .tool .fa {
        color: #FEDA00;
        font-size: 18px;
    }
    .tool-text {
        font-size: 14px;
    }
    .map-views {
        height: 45px;
        bottom: 0;
        align-items: center;
        justify-content: space-around;
        z-index: 1000;
    }
    .map-view {
        height: 100%;
        line-height: 45px;
        flex: 1;
        text-align: center;
    }
    .active {
        background: #FEDA00;
    }
    main,
    .map {
        height: 100%;
    }
    main {
        position: relative;
    }
    .locate {
        position: absolute;
        left: 20px;
        bottom: 70px;
        height: 18px;
        width: 18px;
        background: url(/resources/images/map_dingwei.png) no-repeat;
        background-size: contain;
    }
</style>