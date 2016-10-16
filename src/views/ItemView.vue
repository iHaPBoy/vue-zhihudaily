<template>
  <div class="item-view" v-if="item">
    <spinner :show="!item"></spinner>
    <template v-if="item">
      <div class="item-view-header">
        <!--<a :href="item.share_url" target="_blank">-->
        <h1>{{ item.title }}</h1>
        <!--</a>-->
      </div>
      <div class="item-view-body">
        <div v-html="item.body"></div>
      </div>
      <div class="item-view-comments">
        <p class="item-view-comments-header">
          {{ displayComments.length > 0 ? displayComments.length + ' 条评论' : '暂无评论'}}
        </p>
        <ul v-if="displayComments" class="comment-children">
          <comment v-for="comment in displayComments" :comment="comment"></comment>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
  import Spinner from '../components/Spinner.vue'
  import Comment from '../components/Comment.vue'

  function fetchItem(store) {
    return store.dispatch('FETCH_ITEMS', {
      ids: [store.state.route.params.id]
    })
  }

  function fetchItemComments(store) {
    return store.dispatch('FETCH_ITEM_COMMENTS', {
      id: store.state.route.params.id
    })
  }

  export default {
    name: 'item-view',
    components: {
      Spinner,
      Comment
    },
    data() {
      return {
        displayComments: []
      }
    },
    computed: {
      item () {
        return this.$store.state.items[this.$route.params.id]
      }
    },
    beforeMount () {
      fetchItem(this.$store)

      fetchItemComments(this.$store).then(() => {
        this.displayComments = this.$store.state.comments[this.$route.params.id]
      })
    }
  }
</script>

<style lang="stylus">
  img {
    vertical-align: middle;
    color: transparent;
    font-size: 0;
  }

  .item-view-header
    background-color #fff
    padding 1.8em 40px
    /*padding 1.8em 2em 1em*/
    box-shadow 0 1px 2px rgba(0, 0, 0, .1)
    h1
      display inline
      font-size 1.5em
      margin 0
      margin-right .5em
    .host, .meta, .meta a
      color #999
    .meta a
      text-decoration underline

  .item-view-comments
    background-color #fff
    margin-top 10px
    /*padding 0 2em*/
    padding 8px 40px

  .item-view-comments-header
    margin 0
    font-size 1.1em
    padding 1em 0

  .comment-children
    list-style-type none
    padding 0
    margin 0

  .item-view-body
    background-color #fff
    margin-top 10px

    ul, ol {
      padding-left: 20px;
    }

  .headline {
    border-bottom: 4px solid #f6f6f6;
  }

  .headline-title.onlyheading {
    margin: 20px 0;
  }

  .headline img {
    max-width: 100%;
    vertical-align: top;
  }

  html.no-touch .headline-background:hover {
    background-color: #fdfdfd;
  }

  .headline-background-link {
    line-height: 2em;
    position: relative;
    padding: 25px 40px;
    display: block;
    text-decoration: none;
  }

  .icon-arrow-right {
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -10px;
  }

  .headline-background .heading {
    color: #999;
    font-size: 20px;
    margin-bottom: 5px;
  }

  .headline-background .heading-content {
    font-size: 24px;
    color: #444;
    text-decoration: none;
  }

  .headline-title
    margin 20px 0 10px
    font-size 30px
    line-height 1.2em
    padding 0 40px
    color #222

  .img-wrap .headline-title
    margin 20px 0
    bottom 10px
    z-index 1
    position absolute
    color white
    text-shadow 0px 1px 2px rgba(0, 0, 0, 0.3)

  .headline-summary
    padding 20px 40px 0

  .meta {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 16px;
    color: #b8b8b8;
  }

  .meta span {
    vertical-align: middle;
  }

  .meta .source-icon {
    width: 20px;
    height: 20px;
  }

  .meta .time {
    float: right;
    margin-top: 2px;
  }

  .meta .source-icon {
    margin-right: 4px;
  }

  .meta .source {
    vertical-align: middle;
  }

  .content {
    font-size: 15px;
    color: #444;
    line-height: 2em;
    margin: 10px 0 25px;
  }

  .content img {
    max-width: 100%;
    margin: 10px 0;
    display: block;
  }

  .content img[src*="zhihu.com/equation"] {
    display: inline-block;
    margin: 0 3px;
  }

  .content a {
    color: #105CB6;
    text-decoration: none;
  }

  .content a:hover {
    text-decoration: underline;
  }

  .view-more {
    text-align: right;
    margin-bottom: 34px;
  }

  .view-more a {
    color: #698ebf;
    font-size: 14px;
    text-decoration: none;
  }

  html.no-touch .view-more a:hover {
    text-decoration: underline;
  }

  .question {
    padding: 0 40px;
    overflow: hidden;
  }

  .question + .question {
    border-top: 5px solid #f6f6f6;
  }

  .question-title {
    font-size: 22px;
    line-height: 1.4em;
    color: #222;
    font-weight: bold;
    margin: 25px 0;
  }

  .meta .author {
    color: #444;
  }

  .meta .avatar {
    width: 20px;
    height: 20px;
    border-radius: 2px;
    margin-right: 5px;
  }

  .meta img.avatar {
    display: inline-block;
  }

  .meta .bio {
    color: #999;
  }

  .answer + .answer {
    border-top: 2px solid #f6f6f6;
    padding-top: 30px;
  }

  .qr {
    background-color: #fff;
    text-align: center;
    border-top: 5px solid #F6F6F6;
    padding: 25px;
  }

  .qr .heading {
    font-size: 18px;
    color: #555;
  }

  .qr .subheading {
    font-size: 14px;
    color: #b8b8b8;
  }

  .qr-wrap {
    padding-top: 25px;
    padding-bottom: 15px;
  }

  .footer {
    padding: 20px 0;
    text-align: center;
    color: #b8b8b8;
    font-size: 13px;
  }

  .footer a {
    color: #b8b8b8;
    text-decoration: none;
  }

  @media (max-width 600px)
    .item-view-header
      padding 1.8em 20px
      h1
        font-size 1.25em

    .item-view-comments
      margin-top 10px
      padding 8px 20px

    .content {
      line-height: 1.6em;
      margin: 10px 0 20px;
      /*font-size: 17px*/
    }

    .headline-background-link {
      padding: 20px !important;
      /*padding: 20px 45px 20px 20px !important;*/
    }

    .headline-title {
      font-size: 21px;
      padding: 0 20px !important;
    }

    .question-title {
      font-size: 19px;
      margin: 20px 0;
    }

    .headline-background .heading {
      font-size: 15px !important;
      margin-bottom: 8px;
      line-height: 1em;
    }

    .headline-background .heading-content {
      font-size: 17px !important;
      line-height: 1.2em;
    }

    .question {
      padding: 0 20px !important;
    }
</style>
