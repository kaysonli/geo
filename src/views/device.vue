<template>
    <div class="full-page">
        <header class="toolbar flex-box" v-show="showDefaultToolbar">
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
        <header class="toolbar range flex-box" v-show="showRangeToolbar">
            <div class="tool" 
                @click="setRange(0)"
                v-bind:class="{'active': (0 === rangeTab)}">
                <div class="fa fa-pencil"></div>
                <div class="tool-text">范围</div>
            </div>
            <div class="tool" @click="setRange(1)" v-bind:class="{'active': (1 === rangeTab)}">
                <div class="fa fa-map-signs"></div>
                <div class="tool-text">栅栏</div>
            </div>
        </header>
        <div class="edit-range" v-show="editing">
            <div class="input-field" v-show="rangeTab">
                <input type="number" class="radius" placeholder="请输入数值(最大四位数)" v-el:radius>
                <span>米</span>
            </div>
            <div class="ok" @click="onOK">确定</div>
            <span class="cancel" @click="onCancel">取消</span>
        </div>
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
    data() {
        return {
            active: 1,
            rangeTab: 0,
            editing: false,
            mapViews: ['卫星图', '2D平面图', '3D俯视图'],
            showDefaultToolbar: true,
            showRangeToolbar: false,
            map: null,
            mouseTool: null,
            satelliteLayer: null
        }
    },
    methods: {
        setRange(index) {
            this.editing = true;
            this.rangeTab = index;
            if(index === 0) {
                this.drawPolygon();
            } else {
                this.mouseTool.close(true);
            }
        },
        setRegion() {
            // this.editing = true;
            this.showDefaultToolbar = false;
            this.showRangeToolbar = true;
        },
        onOK() {
            this.editing = false;
            if(this.rangeTab === 0) {
                var polygon = this.map.getAllOverlays('polygon')[0];
                var path = polygon.getPath();
                var points = [];
                path.forEach(function(node) {
                    points.push([node.getLng(), node.getLat()]);
                });
                console.log(points);
                this.mouseTool.close(true);
            }
            this.showDefaultToolbar = true;
            this.showRangeToolbar = false
        },
        onCancel() {
            this.editing = false;
            if(this.rangeTab === 0) {
                this.mouseTool.close(true);
            }
            this.showDefaultToolbar = true;
            this.showRangeToolbar = false
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
        drawPolygon() {
            var map = this.map;
            map.plugin(["AMap.MouseTool"], function() {
                var mouseTool = this.mouseTool = new AMap.MouseTool(map);
                //通过rectOptions更改拉框放大时鼠标绘制的矩形框样式
                // mouseTool.rectZoomIn(rectOptions);     
                mouseTool.polygon();
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
    .toolbar.range .tool{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .toolbar.range .fa {
        margin-right: 10px;
    }
    .tool {
        flex: 1;
        text-align: center;
        height: 100%;
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
    .active,
    .edit-range {
        background: #FEDA00;
    }
    .active .fa {
        color: #fff;
    }
    main,
    .map {
        height: 100%;
    }

    .edit-range {
        background: #FEDA00;
        height: 55px;
        position: absolute;
        top: 50px;
        z-index: 1;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .input-field {
        background: #fff;
        padding: 5px;
        border-radius: 3px;
    }
    .input-field span {
        margin-right: 10px;
    }
    .radius {
        height: 20px;
        border: none;
        outline: 0;
    }
    .radius:after {
        content: '米';
        position: relative;
        right: 20px;
    }
    .ok {
        background: #fff;
        padding: 6px;
        width: 45px;
        text-align: center;
        border-radius: 3px;
    }
</style>