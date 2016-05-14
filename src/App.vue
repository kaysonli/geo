<template>
  <div id="app">
    <hello></hello>
    <group>
      <cell title="vue" value="cool">
      </cell>
    </group>
      	<date-time title="日期"></date-time>
  </div>
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
body {
  font-family: Helvetica, sans-serif;
}
</style>
