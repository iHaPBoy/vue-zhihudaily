import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import * as api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeDate: null,
    items: {/* [id: number]: Item */},
    comments: {/* [id: number]: Comments */},
    dateItemLists: {/* [date: number]: SimpleItem */},
    themeItemLists: {/* [id: number]: SimpleItem */},
    topStories: {/* [id: number]: SimpleItem */}
  },

  actions: {
    FETCH_TOP_STORIES_DATA: ({commit, dispatch, state}) => {
      return api.fetchLatest()
          .then(body => Promise.resolve(body.top_stories))
          .then(top_stories => {
            commit('SET_TOP_STORIES', {top_stories})
            dispatch('ENSURE_TOP_STORIES_ITEMS') // 提前加载文章数据
          })
    },
    ENSURE_TOP_STORIES_ITEMS: ({dispatch, state}) => {
      return dispatch('FETCH_ITEMS', {
        ids: state.topStories.map((item) => item.id)
      })
    },
    FETCH_DATE_ITEM_LIST_DATA: ({commit, dispatch, state}, {date} = {date: moment().format('YYYYMMDD')}) => {
      commit('SET_ACTIVE_DATE', {date})
      return api.fetchItemsByDate(date)
          .then(body => Promise.resolve(body.stories))
          .then(stories => {
            commit('SET_DATE_ITEM_LIST', {date, stories})
            dispatch('ENSURE_ACTIVE_ITEMS') // 提前加载文章数据
          })
    },
    ENSURE_ACTIVE_ITEMS: ({dispatch, getters}) => {
      return dispatch('FETCH_ITEMS', {
        ids: getters.activeIds
      })
    },
    FETCH_ITEMS: ({commit, state}, {ids}) => {
      ids = ids.filter(id => !state.items[id])
      if (ids.length) {
        return api.fetchItems(ids).then(items => commit('SET_ITEMS', {items}))
      } else {
        return Promise.resolve()
      }
    },
    FETCH_ITEM_COMMENTS: ({commit, state}, {id}) => {
      return state.comments[id]
          ? Promise.resolve(state.comments[id])
          : api.fetchItemComments(id).then(response => commit('SET_ITEM_COMMENTS', {id, comments: response.comments}))
    }
  },

  mutations: {
    SET_ACTIVE_DATE: (state, {date}) => {
      state.activeDate = date
    },
    SET_DATE_ITEM_LIST: (state, {date, stories}) => {
      state.dateItemLists[date] = stories
    },
    SET_TOP_STORIES: (state, {top_stories}) => {
      state.topStories = top_stories
    },
    SET_ITEMS: (state, {items}) => {
      items.forEach(item => {
        if (item) {
          Vue.set(state.items, item.id, item)
        }
      })
    },
    SET_ITEM_COMMENTS: (state, {id, comments}) => {
      state.comments[id] = comments
    }
  },

  getters: {
    activeDate (state) {
      return state.activeDate
    },
    activeIds (state, getters) {
      return getters.activeSimpleItems.map((item) => item.id).filter(_ => _)
    },
    activeSimpleItems (state) {
      const {activeDate, dateItemLists} = state
      if (activeDate) {
        return dateItemLists[activeDate]
      } else {
        return []
      }
    },
    activeItems (state, getters) {
      return getters.activeIds.map(id => state.items[id]).filter(_ => _)
    },
    activeTopStories (state) {
      return state.topStories.map(item => ({id: item.id, src: item.image, title: item.title, alt: item.title}))
    }
  }
})

export default store
