<template>
  <div class="slider-arrows-wrap">
    <span class="slider-arrow slider-arrow-left" @click="turn(-1)">&lt;</span>
    <span class="slider-arrow slider-arrow-right" @click="turn(1)">&gt;</span>
  </div>
</template>

<script>
  export default {
    name: 'SliderArrows',
    props: {
      turn: {
        type: Function,
        required: true
      }
    }
  }
</script>

<style>
  .slider-arrows-wrap span {
    font-size: 14px;
  }
</style>