<template>
    <div class="container f0_bg">
        <div class="shezhi">
            <div class="fl">LED</div>
            <div class="fr">
                <div class="switch">
                    <input type="checkbox" v-model="checked.led" v-el:led>
                    <label><i></i></label>
                </div>
            </div>
        </div>
        <div class="shezhi">
            <div class="fl">时区设置</div>
            <span class="time-zone">{{direction}},{{hour}}h,{{minute}}m</span>
            <!-- <div class="fr">east, 8h, 0m</div> -->
            <div class="fr icon-down" v-bind:class="{'icon-down-top': !!timeZoneExpanded}" v-touch:tap="toggleTimeZone"></div>
            <div class="icon-down-content" v-show="timeZoneExpanded">
              <div class="clear"></div>
                <div class="time-picker">
                  <select :items="directions" v-model="direction">
                    <option value="{{item.value}}" v-for="item in directions">{{item.text}}</option>
                  </select>
                  <select :items="hours" v-model="hour">
                    <option value="{{item.value}}" v-for="item in hours">{{item.text}}</option>
                  </select>
                  <select :items="minutes" v-model="minute">
                    <option value="{{item.value}}" v-for="item in minutes">{{item.text}}</option>
                  </select>
                  <div class="fr">
                    <input type="submit" value="确定">
                  </div>
                </div>
            </div>
        </div>
        <div class="shezhi">
            <div class="fl">定位模式</div>
            <div class="fr icon-down" v-bind:class="{'icon-down-top': !!geoExpanded}" v-touch:tap="toggleGeoMode"></div>
            <div class="icon-down-content" v-show="geoExpanded">
                <div class="clear"></div>
                <div class="fl">GPS定位</div>
                <div class="fr">
                    <div class="switch">
                        <input type="checkbox" v-model="checked.gps">
                        <label><i></i></label>
                    </div>
                </div>
                <div class="clear"></div>
                <div class="fl">基站定位</div>
                <div class="fr">
                    <div class="switch">
                        <input type="checkbox" v-model="checked.station">
                        <label><i></i></label>
                    </div>
                </div>
                <div class="clear"></div>
                <div class="fl">GPS+基站定位</div>
                <div class="fr">
                    <div class="switch">
                        <input type="checkbox" v-model="checked.gps_station">
                        <label><i></i></label>
                    </div>
                </div>
            </div>
        </div>
        <div class="shezhi">
            <div class="fl">报警设置</div>
            <div class="fr icon-down" v-bind:class="{'icon-down-top': !!alarmExpanded}" v-touch:tap="toggleAlarm"></div>
        </div>
        <div class="shezhi" v-show="alarmExpanded">
            <div class="fl">震动唤醒</div>
            <div class="fr">
                <input type="text" v-model="waken" placeholder="1" id="trackBar_1">
                <input type="submit" value="确定">
            </div>
            <div class="clear"></div>
            <div>
                <input type="range" v-model="waken" id="trackBar1" min="1" max="10" step="1" value="1" />
            </div>
        </div>
        <div class="shezhi" v-show="alarmExpanded">
            <div class="fl">上传间隔</div>
            <div class="fr">
                <input type="text" v-model="frequency" placeholder="1" id="trackBar_2">
                <input type="submit" value="确定">
            </div>
            <div>
                <input type="range" v-model="frequency" id="trackBar2" min="1" max="10" step="1" value="1" />
            </div>
        </div>
        <div class="shezhi" v-touch:tap="setDevicePassword">
            <div class="fl">修改设备密码</div>
            <div class="fr icon-right"></div>
        </div>
        <div class="shezhi" v-touch:tap="viewDeviceInfo">
            <div class="fl">设备信息</div>
            <div class="fr icon-right"></div>
        </div>
    </div>
</template>
<script>
import Scroller from './../components/scroller.vue';
  export default {
    components: {
      Scroller
    },
    vuex: {
      getters: {
        activeDevice: state => state.activeDevice
      }
    },
    route: {
      data() {
        console.log(this.activeDevice.settings);
      }
    },
    computed: {
      directions() {
        return [{
          value: 'east',
          text: '东'
        }, {
          value: 'west',
          text: '西'
        }]
      },
      hours() {
        var items = [];
        for(var i = 0; i<=12;i++) {
          items.push({
            value: i,
            text: i + ' h'
          });
        }
        return items;
      },
      minutes() {
        var items = [];
        for(var i = 0;i<=12;i++) {
          items.push({
            value: i * 5,
            text: i * 5 + ' m'
          });
        }
        return items;
      }
    },
    data() {
      return {
        direction: 'east',
        hour: 8,
        minute: 0,
        timeZoneExpanded: false,
        geoExpanded: false,
        alarmExpanded: false,
        checked: {
          led: true,
          gps: true,
          station: false,
          gps_station: false
        },
        frequency: 1,
        waken: 1,
        settings: {}
      }
    },
    methods: {
      // querySettings(devId) {
      //   this.$http.get(this.$root.serverUrl + '/additionals/' + devId, {

      //   }).then(function(res) {
      //     this.settings = res.data.entrySet[0];
      //     console.log(this.settings);
      //     this.parseSettings(res.data.entrySet[0])
      //   }, this);
      // },
      setDevicePassword() {
        this.$router.go('/settings/setpwd');
      },
      viewDeviceInfo() {
        this.$router.go('/settings/device', true);
      },
      toggleGeoMode() {
        this.geoExpanded = !this.geoExpanded;
      },
      toggleAlarm() {
        this.alarmExpanded = !this.alarmExpanded;
      },
      toggleTimeZone() {
        this.timeZoneExpanded = !this.timeZoneExpanded;
      }
    },
    watch: {
      'checked.led': function(val, oldValue) {
        console.log(val);
      }
    }
  }
</script>
<style>
    /*设置begin*/
.fl {
  float: left;
}
.fr {
  float: right;
}
.f0_bg {
  background: #f0f0f0;
}
.shezhi {
  font-size: 14px;
  line-height: 40px;
  padding: 1rem;
  margin-bottom: 6px;
  background: #fff;
  overflow: hidden;
}
.shezhi .fr input[type="text"] {
  width: 50px;
  border: 1px dotted #dedede;
  height: 30px;
  padding-left: 5px;
}
.shezhi .fr input[type="submit"] {
  background: #feda00;
  border: none;
  line-height: 30px;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 6px;
}
.shezhi input[type="range"] {
  margin-top: 20px;
  background-color: #F0F0F0;
  border-radius: 15px;
  width: 100%;
  -webkit-appearance: none;
  height: 4px;
}
.shezhi input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  cursor: default;
  height: 55px;
  width: 30px;
  background: url(/resources/images/set_slider.png) no-repeat center center / 100% auto;
}
.switch {
  position: relative;
  width: 50px;
  height: 25px;
}
.switch label {
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  background: #cccccc;
  border-radius: 40px;
}
.switch label:after {
  content: "";
  position: absolute;
  z-index: -1;
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -8px;
  border-radius: inherit;
  background: #ababab;
}
.switch input {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.switch label:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: -18px;
  right: -18px;
  bottom: -18px;
  left: -18px;
  border-radius: inherit;
  background: #eee;
}
.switch label i {
  display: block;
  height: 80%;
  width: 40%;
  border-radius: inherit;
  position: absolute;
  z-index: 2;
  right: 50%;
  top: 10%;
  background: #fff;
}
.switch label i:after {
  content: "";
  position: absolute;
  left: 15%;
  top: 25%;
  width: 70%;
  height: 50%;
  border-radius: inherit;
}
.switch input:checked ~ label {
  background: #ffda00;
}
.switch input:checked ~ label i {
  right: 10%;
}
.icon-down {
  background: url(/resources/images/ico_down.png) no-repeat center center;
  width: 20px;
  height: 20px;
  -webkit-transition: all .2s;
          transition: all .2s;
}
.icon-right {
  background: url(/resources/images/ico_down.png) no-repeat center center;
  width: 20px;
  height: 20px;
  -webkit-transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
          transform: rotate(-90deg);
}
.icon-down-top {
  -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
          transform: rotate(180deg);
}
.icon-down-content {
  
}
.icon-down-content .clear {
  height: 1rem;
}
.clear {
  clear: both;
}
.time-picker {
  display: flex;
  align-items: center;
}
.time-picker select {
  flex: 1;
  height: 30px;
}
.time-zone {
  margin-left: 30px;
}
</style>