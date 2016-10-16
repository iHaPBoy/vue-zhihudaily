<template>
  <transition name="fade">
    <div class="slider_wrap">
      <slider :items="displayedItems" :speed="1" :delay="5" :pause="true" :autoplay="true" :dots="true"
              :arrows="true" :click="sliderItemclick"/>
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
  import Slider from '../components/slider/Slider.vue'
  import {mapGetters} from 'vuex'
  import {fetchLatest} from '../store/api'

  export default{
    data(){
      return {
        loading: null,
        displayedItems: []
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
      loadItems() {
        this.loading = true;
        this.$store.dispatch('FETCH_TOP_STORIES_DATA').then(() => {
          this.displayedItems = this.$store.getters.activeTopStories
          this.loading = false;
        })
      },
      sliderItemclick(item) {
        this.$router.push({name: 'story', params: {id: item.id}})
      }
    },
    mounted() {
      this.loadItems();
    }
  }
</script>
