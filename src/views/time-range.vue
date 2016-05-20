<template>
    <div class="full-page">
        <div class="picker">
        	<scroller></scroller>
	        <scroller></scroller>
	        <scroller></scroller>
        </div>
    </div>
</template>

<script>
import Scroller from './../components/scroller.vue';
export default {
  components: {
    Scroller
  },
  methods: {
      
  }
}
</script>
<style>
    .picker {
    	display: flex;
    }
</style>