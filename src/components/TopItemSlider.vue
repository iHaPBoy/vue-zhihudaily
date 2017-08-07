<template>
  <transition name="fade">
    <div class="slider_wrap">
      <slider :items="displayItems" :speed="1" :delay="5" :pause="true" :autoplay="true" :dots="true" :arrows="true"
              :click="sliderItemClick"/>
    </div>
  </transition>
</template>

<style lang="stylus">
  .slider_wrap
    margin-top 30px
    height 200px
    overflow hidden
    transition all .5s cubic-bezier(.55, 0, .1, 1)

  @media screen and (max-width: 600px)
    .slider_wrap
      margin-top 0
</style>

<script>
  import Slider from './slider/index.vue'
  import {mapGetters} from 'vuex'

  export default{
    data () {
      return {
        loading: null,
        displayItems: []
      }
    },
    components: {
      Slider
    },
    computed: {
      ...mapGetters([
        'activeTopStories'
      ]),
    },
    methods: {
      loadItems () {
        this.loading = true;
        this.$store.dispatch('FETCH_TOP_STORIES_DATA').then(() => {
          this.displayItems = this.$store.getters.activeTopStories
          this.loading = false;
        })
      },
      sliderItemClick (item) {
        this.$router.push({name: 'story', params: {id: item.id}})
      }
    },
    mounted () {
      this.loadItems()
    }
  }
</script>
