<template>
  <li class="news-item" @click="showStory">
    <div class="title">{{ item.title }}</div>
    <div class="image" v-if="item.images"><img :src="item.images[0]"></div>
  </li>
</template>

<script>
  export default {
    name: 'news-item',
    props: ['item'],
    methods: {
      showStory() {
        this.$router.push({name: 'story', params: {id: this.item.id}})
      }
    }
  }
</script>

<style lang="stylus">
  .news-item
    display flex
    align-items center
    overflow hidden
    background-color #fff
    border-bottom 1px solid #eee
    &:hover
      background-color #fafafa
    .title
      display block
      padding 14px 15px
      flex 1
      a:visited
        color #ababab
    .image
      color #009dd7
      overflow hidden
      text-align center
      img
        width 80px
        height 100%
        max-height 24px

  @media (max-width 600px)
    .news-item
      /*padding 20px 20px*/

    .news-item .image
      display none
</style>
