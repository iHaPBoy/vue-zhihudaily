<template>
  <div class="slider" :class="{'slider-cursor': click}" @mouseover="pause && pausePlay()" @mouseout="pause && goPlay()"
       :style="{'width': `${this.width}px`, 'height': `${this.height}px`}">
    <div class="slider-item-list"
         :style="{'width': `${this.count * 100}%`, 'left': `${-100 * this.current}%`, transitionDuration: `${this.speed}s`}">
      <slider-item v-for="item in items" :count="count" :item="item" :click="click"></slider-item>
    </div>
    <slider-dots v-if="dots" :count="count" :current="current" :turn="turn"></slider-dots>
    <slider-arrows v-if="arrows" :turn="turn"></slider-arrows>
  </div>
</template>

<script>
  import SliderItem from './SliderItem.vue'
  import SliderDots from './SliderDots.vue'
  import SliderArrows from './SliderArrows.vue'
  export default {
    data () {
      return {
        current: 0,
        autoPlayFlag: null
      }
    },
    computed: {
      count() {
        return this.items.length;
      }
    },
    props: {
      items: {
        type: Array,
        required: true
      },
      dots: {
        type: Boolean,
        required: false,
        default: true
      },
      arrows: {
        type: Boolean,
        required: false,
        default: true
      },
      autoplay: {
        type: Boolean,
        required: false,
        default: true
      },
      delay: {
        type: Number,
        required: false,
        default: 2
      },
      speed: {
        type: Number,
        required: false,
        default: 1.5
      },
      pause: {
        type: Boolean,
        required: false,
        default: true
      },
      width: {
        type: Number,
        required: false
      },
      height: {
        type: Number,
        required: false
      },
      click: {
        type: Function,
        required: false
      }
    },
    methods: {
      turn (i) {
        let _i = this.current + i
        if (_i < 0) {
          (_i = _i + this.count)
        }
        if (_i >= this.count) {
          _i = _i - this.count
        }
        this.current = _i
      },
      goPlay () {
        if (this.autoplay) {
          this.autoPlayFlag = setInterval(() => {
            this.turn(1)
          }, this.delay * 1000)
        }
      },
      pausePlay () {
        clearInterval(this.autoPlayFlag)
      }
    },
    mounted () {
      this.goPlay()
    },
    components: {
      SliderItem,
      SliderDots,
      SliderArrows
    }
  }
</script>

<style>
  .slider * {
    margin: 0;
    padding: 0;
  }

  .slider {
    overflow: hidden;
    width: 100%;
    height: inherit;
    position: relative;
  }

  .slider-cursor {
    cursor: pointer;
  }

  .slider .slider-item-list {
    height: inherit;
    overflow: hidden;
    position: relative;
    transition: left 1s;
    left: 0;
  }

  .slider .slider-item {
    display: block;
    height: inherit;
    float: left;
  }

  .slider .slider-item .slider-item-title {
    display: flex;
    color: #ffffff;
    font-size: 24px;
    padding: 30px;
    background: linear-gradient(transparent, rgba(0, 0, 0, .7));
  }

  .slider .slider-item .img {
    display: flex;
    width: 100%;
    height: inherit;
    background-size: 100%;
    background-position: 50% 40%;
    flex-direction: column;
    justify-content: flex-end;
  }

  .slider .slider-arrow {
    display: inline-block;
    color: rgba(255, 255, 255, 0.6);
    font-size: 50px;
    position: absolute;
    top: 50%;
    margin-top: -50px;
    z-index: 100;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
  }

  .slider .slider-arrows-wrap {
    opacity: 0;
    transition: all .2s ease;
  }

  .slider:hover .slider-arrows-wrap {
    opacity: 1;
  }

  .slider .slider-arrow:hover {
    color: rgba(255, 255, 255, 0.9);
    background: rgba(0, 0, 0, 0.1);
  }

  .slider .slider-arrow.slider-arrow-right {
    right: 0;
  }

  .slider .slider-arrow.slider-arrow-left {
    left: 0;
  }

  .slider .slider-dots-wrap {
    z-index: 99;
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 2px;
  }

  .slider .slider-dots-wrap .slider-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: rgba(204, 204, 204, 0.6);
    margin: 6px;
    cursor: pointer;
    border-radius: 20px;
  }

  .slider .slider-dots-wrap .slider-dot:hover {
    background-color: #cdcdcd;
  }

  .slider .slider-dots-wrap .slider-dot.slider-dot-selected {
    background-color: #ffffff;
  }

  @media screen and (max-width: 600px) {
    .slider .slider-item .slider-item-title {
      font-size: 18px;
      display: flex;
      color: #ffffff;
      padding: 30px 20px;
      background: linear-gradient(transparent, rgba(0, 0, 0, .7));
    }
  }
</style>
