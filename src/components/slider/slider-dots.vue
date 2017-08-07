<template>
  <div class="slider-dots-wrap">
    <span class="slider-dot" v-for="i in count" :key="'dot' + i" :class="{ 'slider-dot-selected': current === (i - 1) }"
          @click="handleClick(i)"></span>
  </div>
</template>

<script>
  export default {
    name: 'SliderDots',
    props: {
      count: {
        type: Number,
        required: true
      },
      current: {
        type: Number,
        required: true,
        default: 0
      },
      turn: {
        type: Function,
        required: true
      }
    },
    methods: {
      handleClick (i) {
        let option = i - 1 - this.current
        this.turn(option)
      }
    }
  }
</script>