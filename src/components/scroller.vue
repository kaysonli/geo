<template>
  <div class="scroller-component" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div class="scroller-mask" data-role="mask"></div>
    <div class="scroller-indicator" data-role="indicator"></div>
    <div class="scroller-content" v-bind:style="{ transform: 'translate3D(0, ' + top + 'px, 0)' }">
      <div class="scroller-item" v-for="n in 12" data-value="{{n+1}}">{{n+1}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      top: 0,
      items: [{
        text: '',
        value: 1
      }],
      // Note: modifying `msg` below will not cause changes to occur with
      // hot-reload. As reloaded components preserve their initial state,
      // modifying these values will have no effect.
      msg: 'Hello World!'
    }
  },
  methods: {
    onTouchStart(evt) {
      this.startY = evt.touches[0].clientY;
    },
    onTouchMove(evt) {
      var y = evt.touches[0].clientY;
    },
    onTouchEnd(evt) {

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
