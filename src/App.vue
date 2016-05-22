<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import Group from 'vux/components/group'
import Cell from 'vux/components/cell'
import DateTime from 'vux/components/datetime'

export default {
  components: {
    Hello, Group, Cell, DateTime
  },
  data() {
    return {
      serverUrl: ''
    }
  },
  methods: {
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
        this.$broadcast('devices-ready', devices);
        this.queryGPS(devices);
      }, this);
    },
    queryGPS(devices) {
      var devIds = [];
      devices.forEach(function(dev) {
          devIds.push(dev.id);
      });
      this.$http.get(this.$root.serverUrl + '/gps', {
          devIds: devIds
      }).then(function(res) {
        this.$broadcast('gps-ready',res.data.entrySet);
          // setTimeout(function() {
          //     this.initMaps();
          // }.bind(this), 0);
      }, this);
    }
  },
  ready() {
    this.queryDevices();
  }
}
</script>

<style>
html, body {
  height: 100%;
}
#app {
  height: 100%;
}
body {
  font-family: 微软雅黑, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
}
.btn {
  height: 47px;
  line-height: 47px;
  width: 80%;
  border-radius: 20px;
  text-align: center;
  background: #FEDA00;
  margin: 20px auto;
}
.btn-revert {
  background: #fff;
  border: 1px solid #ececec;
}
.nav-bar {
  height: 45px;
  line-height: 45px;
}
.flex-box {
  display: flex;
}
.flex-item-fill {
  flex: 1;
}
.nav-bar .title {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}
.nav-bar{
  padding: 0 10px;
}
.nav-bar .fa {
  
}
.center {
  text-align: center;
}

.text-field {
    margin-bottom: 0;
    border-bottom: 1px solid #ececec;
    background: #fff;
    align-items: center;
}
.text-field input {
    display: block;
    width: 90%;
    padding-left: 0;
    padding-right: 0;
    border: none;
    outline: 0;
    padding: 26px 16px;
    font-size: 16px;
}
.text-field input:focus {
    border: none;
    -webkit-appearance: none;
}

.page-bottom {
  flex: 1;
  background: #FEDA00;
}
.page-bottom .btn {
    margin-top: 30px;
}

.full-page {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
  .amap-touch-toolbar .amap-zoomcontrol {
      bottom: 140px;
  }
</style>
