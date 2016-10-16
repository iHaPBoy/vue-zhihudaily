<template>
  <div class="news-view">
    <spinner :show="loading"></spinner>
    <div class="news-list-nav">
      <router-link v-if="pagePrev" :to="'/' + pagePrev">&nbsp;&lt;&nbsp;</router-link>
      <a v-else class="disabled">&nbsp;&lt;&nbsp;</a>
      <span>{{ date }}</span>
      <router-link v-if="pageNext" :to="'/' + pageNext">&nbsp;&gt;&nbsp;</router-link>
      <a v-else class="disabled">&nbsp;&gt;&nbsp;</a>
    </div>
    <top-item-slider></top-item-slider>
    <transition :name="transition">
      <div class="news-list" :key="displayedDate" v-if="displayedDate > 0">
        <transition-group tag="ul" name="item">
          <item v-for="item in displayedItems" :key="item.id" :item="item">
          </item>
        </transition-group>
      </div>
    </transition>
  </div>

</template>

<script>
  import Spinner from './Spinner.vue'
  import TopItemSlider from './TopItemSlider.vue'
  import Item from './Item.vue'
  import {mapGetters} from 'vuex'
  import moment from 'moment'

  export default {
    components: {
      Spinner,
      Item,
      TopItemSlider
    },
    methods: {
      loadItems(to = this.date, from = -1) {
        if (this.date > this.today) {
          this.$router.replace(`/${this.today}`)
        }
        this.loading = true
        this.$store.dispatch('FETCH_DATE_ITEM_LIST_DATA', {date: this.date}).then(() => {
          this.transition = to < from ? 'slide-left' : 'slide-right'
          this.displayedDate = to
          this.displayedItems = this.$store.getters.activeSimpleItems
          this.loading = false
        })
      }
    },
    data () {
      const isInitialRender = !this.$root._isMounted
      return {
        loading: false,
        transition: 'slide-left',
        displayedDate: isInitialRender ? this.date : -1,
        displayedItems: isInitialRender ? this.$store.getters.activeSimpleItems : []
      }
    },
    computed: {
      ...mapGetters([
        'activeDate'
      ]),
      date() {
        return this.$store.state.route.params.date || this.today
      },
      pagePrev() {
        const next = moment(this.activeDate).add(1, 'days').format('YYYYMMDD')
        return next > this.today ? null : next
      },
      pageNext() {
        const prev = moment(this.activeDate).subtract(1, 'days').format('YYYYMMDD')
        return prev < 20130519 ? null : prev
      },
      today() {
        return moment().format('YYYYMMDD')
      }
    },
    beforeMount () {
      if (this.$root._isMounted) {
        console.log('_isMounted')
      }
    },
    mounted() {
      this.loadItems(this.date)
    },
    watch: {
      date (to, from) {
        this.loadItems(to, from)
      }
    },
  }
</script>

<style lang="stylus">
  .news-view
    padding-top 45px

  .news-list-nav, .news-list
    background-color #fff
    border-radius 2px

  .news-list-nav
    padding 15px 30px
    position fixed
    text-align center
    top 55px
    left 0
    right 0
    z-index 998
    box-shadow 0 1px 2px rgba(0, 0, 0, .1)
    a
      margin 0 1em
    .disabled
      color #ccc

  .news-list
    position absolute
    /*margin 30px 0*/
    margin 20px 0
    width 100%
    transition all .5s cubic-bezier(.55, 0, .1, 1)
    ul
      list-style-type none
      padding 0
      margin 0

  .slide-left-enter, .slide-right-leave-active
    opacity 0
    transform translate(30px, 0)

  .slide-left-leave-active, .slide-right-enter
    opacity 0
    transform translate(-30px, 0)

  .item-move, .item-enter-active, .item-leave-active
    transition all .5s cubic-bezier(.55, 0, .1, 1)

  .item-enter
    opacity 0
    transform translate(30px, 0)

  .item-leave-active
    position absolute
    opacity 0
    transform translate(30px, 0)

  @media (max-width 600px)
    .news-list
      /*margin 10px 0*/
      margin 0
</style>
