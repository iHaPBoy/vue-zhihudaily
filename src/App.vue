<template>
  <div id="app">
    <div class="header">
      <div class="inner">
        <router-link to="/" exact>
          <img class="logo" src="./assets/logo.png" alt="logo"> 知乎日报
        </router-link>
        <a class="github" href="https://github.com/iHaPBoy/vue-zhihudaily" target="_blank">
          Built with Vue.js
        </a>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    computed: {
//      root() {
//        return this.$store.state.activeDate ? '/' + this.$store.state.activeDate : '/'
//      }
    }
  }
</script>

<style lang="stylus">
  body
    font-family Roboto, Helvetica, sans-serif
    font-size 15px
    background-color lighten(#eceef1, 30%)
    margin 0
    padding-top 55px
    color #34495e

  a
    color #34495e
    text-decoration none

  .header
    background-color #3CC6FD
    position fixed
    z-index 999
    top 0
    left 0
    right 0
    .inner
      height 55px
      max-width 800px
      box-sizing border-box
      margin 0px auto
      padding 15px 5px
    a
      color rgba(255, 255, 255, .8)
      line-height 24px
      transition color .15s ease
      display inline-block
      vertical-align middle
      font-weight 300
      letter-spacing .075em
      margin-right 1.8em
      &:hover
        color #fff
      &.router-link-active
        color #fff
        font-weight 400
      &:nth-child(6)
        margin-right 0
    .github
      color #fff
      font-size .9em
      margin 0
      float right

  .logo
    width 24px
    margin-right 10px
    display inline-block
    vertical-align middle

  .view
    max-width 800px
    margin 0 auto
    position relative

  .fade-enter-active, .fade-leave-active
    transition all .2s ease

  .fade-enter, .fade-leave-active
    opacity 0

  @media (max-width 860px)
    .header .inner
      padding 15px 30px

  @media (max-width 600px)
    body
      font-size 14px
    .header
      .inner
        padding 15px
      a
        margin-right 1em
      .github
        display none
</style>
