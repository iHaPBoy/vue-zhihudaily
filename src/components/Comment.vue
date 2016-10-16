<template>
  <li v-if="comment" class="comment">
    <div class="info">
      <span class="author">{{ comment.author }}</span>
      <span class="time">{{ comment.time | timeAgo }}</span>
    </div>
    <div class="text" v-html="comment.content"></div>
  </li>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'comment',
    props: ['comment'],
    filters: {
      timeAgo(value) {
        return moment.unix(value).fromNow()
      }
    }
  }
</script>

<style lang="stylus">
  .comment-children
    .comment-children
      margin-left 1em

  .comment
    padding 1em 0
    border-top 1px solid #eee
    position relative
    .expand
      cursor pointer
    .info, .text
      font-size .9em
    .info
      padding-bottom .5em
      a
        color #999
        text-decoration underline
      .author
        font-weight 500
        color #222
      .time
        color #999
    .text
      color #444
      font-size 13px
      line-height 1.7
      word-wrap break-word
      text-align justify
      a:hover
        color #105cb6
</style>
