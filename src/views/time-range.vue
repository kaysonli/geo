<template>
    <div class="full-page">
        <div class="picker">
        	<scroller v-ref:year :items="years" :ticks="3"></scroller>
	        <scroller v-ref:month :items="months" :ticks="3"></scroller>
	        <scroller v-ref:date :items="dates" :ticks="3"></scroller>
        </div>
        <div class="btn" v-touch:tap="onOK">确定</div>
    </div>
</template>

<script>
import Scroller from './../components/scroller.vue';
export default {
  components: {
    Scroller
  },
  data() {
    return {
      year: 2015,
      month: 5,
      date: 21
    }
  },
  computed: {
    years() {
      var today = new Date();
      var items = [];
      var year = today.getFullYear();
      for (var i = 5; i >= 0; i--) {
        items.push({
          value: year - i,
          text: (year - i) + ' 年'
        });
      }
      return items;
    },
    months() {
      var items = [];
      for (var i = 11; i >= 0; i--) {
        items.push({
          value: 12 - i,
          text: (12 - i) + ' 月'
        });
      }
      return items;
    },
    dates() {
      var year = this.$refs.year.value;
      var month = this.$refs.month.value;
      var leapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
      var daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var days = daysInMonth[month - 1];
      var items = [];
      for (var i = days - 1; i >= 0; i--) {
        items.push({
          value: days - i,
          text: (days - i) + ' 日'
        });
      }
      // console.log('date: ', this.$refs.date.value);
      return items;
    }
  },
  methods: {
    onOK() {
      console.log(this.$refs.year.value, this.$refs.month.value, this.$refs.date.value);
    }
  },
  ready() {
    this.$refs.year.value = this.year;
    this.$refs.month.value = this.month;
    this.$refs.date.value = this.date;
    // this.$refs.year.setValue(0);
  }
}
</script>
<style>
    .picker {
    	display: flex;
    }
</style>