<template>
  <!-- <div class="app">
    <hello></hello>
    <group>
      <cell title="vue" value="cool">
      </cell>
    </group>
      	<date-time title="日期"></date-time>
  </div> -->
  <router-view></router-view>
</template>

<script>
import Hello from './components/Hello.vue'
import Group from 'vux/components/group'
import Cell from 'vux/components/cell'
import DateTime from 'vux/components/datetime'
// require('vux/vux.css');

export default {
  components: {
    Hello, Group, Cell, DateTime
  }
}
</script>

<style>
@import url("./../node_modules/vux/vux.css");
@import url("./../node_modules/font-awesome/css/font-awesome.min.css");
body {
  font-family: 微软雅黑, Helvetica, sans-serif;
  background: yellow;
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
</style>
