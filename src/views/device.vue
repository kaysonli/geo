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
            <div class="tool" :class="{active: tab === 'gps'}" v-touch:tap="realtimeGPS">
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
    vuex: {
        getters: {
            devices: state => state.devices,
            gpsReady: state => state.gpsReady,
            activeDevice: state => state.activeDevice
        }
    },
    route: {
        data(transition) {
            if(this.gpsReady) {
                this.initMap(this.activeDevice)
            }
            transition.next();
        }
    },
    data() {
        return {
            tab: '',
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
    watch: {
        'tab': function(val, oldVal) {
            if(!val) {
                clearInterval(this.gpsTimer);
            }
        },
        'gpsReady': function(val) {
            if(val) {
                this.initMap(this.activeDevice);
            }
        }
    },
    methods: {
        setCenter() {
            var dev = this.activeDevice;
            this.map.setCenter([dev.gps.lng, dev.gps.lat]);
        },
        setRegion() {
            this.tab = '';
            if(this.trackLine) {
                this.trackLine.setMap(null);
            }
            this.$router.go(this.$route.path + '/range');
        },
        viewPath() {
            this.tab = '';
            this.$router.go(this.$route.path + '/track');
        },
        viewAlarms() {
            this.tab = '';
            this.$router.go('/warnings/' + this.$route.params.id);
        },
        realtimeGPS() {
            this.tab = 'gps';
            this.gpsTimer = setInterval(function() {
                this.queryGPS();
            }.bind(this), 10000);
        },
        configure() {
            this.tab = '';
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
            if(this.map) {
                this.map.setCenter(center);
                return;
            }
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
        padding-top: 5px;
    }
    .tool .fa {
        color: #FEDA00;
        font-size: 18px;
    }
    .tool.active .fa {
        color: #fff;
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