<template>
  <div class="scroller-component">
    <div class="scroller-mask" data-role="mask" 
      @touchstart="onTouchStart" 
      @touchmove="onTouchMove" 
      @touchend="onTouchEnd"></div>
    <div class="scroller-indicator" data-role="indicator"></div>
    <div class="scroller-content" v-bind:style="{ transform: 'translate3D(0, ' + top + 'px, 0)' }">
      <div class="scroller-item" 
        v-bind:class="{'scroller-item-selected': (n===selectedIndex)}"
        v-for="n in items" data-value="{{n+2000}}">{{n+2000}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      top: 0,
      selectedIndex: 0,
      items: 8
    }
  },
  methods: {
    setValue(value) {

    },
    getValue() {
      return this
    },
    onTouchStart(evt) {
      this.lastY = evt.touches[0].clientY;
    },
    onTouchMove(evt) {
      var unit = 34;
      var max = unit * 3;
      var min = 0;
      var y = evt.touches[0].clientY;
      var offset = y - this.lastY;
      this.lastY = y;
      this.top += offset;
      if(this.top >= max) {
        this.top = max;
      }
      if(this.top < min) {

      }
    },
    onTouchEnd(evt) {
      var unit = 34;
      var zero = unit * 3;
      var m = Math.round(this.top / unit);
      this.top = m * unit;
      this.selectedIndex = (zero - this.top) / unit;
      console.log(selectedIndex);
    }
  }
}
</script>
<style>
  .scroller-component {
    display: block;
    position: relative;
    height: 238px;
    width: 100%;
    overflow: hidden;
  }
  .scroller-item {
    line-clamp: 1;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis
  }

  .scroller-content {
      z-index: 1
  }

  .scroller-content,.scroller-mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
  }
  .scroller-mask {
    height: 100%;
    margin: 0 auto;
    z-index: 3;
    background-image: -webkit-linear-gradient(top,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),-webkit-linear-gradient(bottom,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));
    background-image: linear-gradient(180deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));
    background-position: top,bottom;
    background-size: 100% 102px;
    background-repeat: no-repeat
}

.scroller-item {
    text-align: center;
    font-size: 16px;
    height: 34px;
    line-height: 34px;
    color: #000
}

.scroller-indicator {
    width: 100%;
    height: 34px;
    position: absolute;
    left: 0;
    top: 102px;
    z-index: 3;
    background-image: -webkit-linear-gradient(top,#d0d0d0,#d0d0d0,transparent,transparent),-webkit-linear-gradient(bottom,#d0d0d0,#d0d0d0,transparent,transparent);
    background-image: linear-gradient(180deg,#d0d0d0,#d0d0d0,transparent,transparent),linear-gradient(0deg,#d0d0d0,#d0d0d0,transparent,transparent);
    background-position: top,bottom;
    background-size: 100% 1px;
    background-repeat: no-repeat
}
</style>
