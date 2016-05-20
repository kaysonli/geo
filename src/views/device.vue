<template>
    <div class="full-page">
        <header class="toolbar flex-box">
            <div class="tool" @click="setRegion">
                <div class="fa fa-map-signs"></div>
                <div class="tool-text">围栏</div>
            </div>
            <div class="tool" @click="viewPath">
                <div class="fa fa-paw"></div>
                <div class="tool-text">轨迹</div>
            </div>
            <div class="tool" @click="viewAlarms">
                <div class="fa fa-warning"></div>
                <div class="tool-text">报警</div>
            </div>
            <div class="tool">
                <div class="fa fa-map-marker"></div>
                <div class="tool-text">实时定位</div>
            </div>
            <div class="tool" @click="configure">
                <div class="fa fa-gear"></div>
                <div class="tool-text">设置</div>
            </div>
        </header>
        <router-view></router-view>
        <main>
            <div class="map" v-el:map></div>
        </main>
        <footer class="map-views flex-box">
            <div v-for="item in mapViews" class="map-view" 
            @click="setView($index)"
            v-bind:class="{'active': ($index === active)}">{{item}}</div>
        </footer>
    </div>
</template>

<script>
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
            console.log(points);
            this.mouseTool.close(true);
        },
        'draw-cancel': function() {
            if(this.mouseTool) {
                this.mouseTool.close(true);
            }
        },
        'set-radius': function(radius) {
            this.drawCircle(radius);
            console.log(radius);
        }
    },
    methods: {
        setRegion() {
            this.$router.go(this.$route.path + '/range');
        },
        viewPath() {

        },
        viewAlarms() {

        },
        configure() {

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
             //在地图中添加MouseTool插件
            // var mouseTool = new AMap.MouseTool(this.map);
            // mouseTool.polygon();
            // AMap.event.addDomListener(document.getElementById('point'), 'click', function() {
            //     mouseTool.marker({offset:new AMap.Pixel(-14,-11)});
            // }, false);
            // AMap.event.addDomListener(document.getElementById('line'), 'click', function() {
            //     mouseTool.polyline();
            // }, false);
            // AMap.event.addDomListener(document.getElementById('polygon'), 'click', function() {
            //     mouseTool.polygon();
            // }, false);
        },
        initMap() {
            var map = this.map = new AMap.Map(this.$els.map, {
                zoom: 12,
                center: [114.029808, 22.6284027]
            });
            var satellite = this.satelliteLayer = new AMap.TileLayer.Satellite();
            satellite.setMap(this.map);
            satellite.hide();
            // map.plugin(["AMap.MapType"],function(){
            //     //地图类型切换
            //     var type= new AMap.MapType({
            //         defaultType:0 //使用2D地图
            //     });
            //     map.addControl(type);
            // });
            
        }
    },
    ready() {
        console.log(this.$route.params.device);
        setTimeout(function() {
            this.initMap();
        }.bind(this), 0);
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
</style>