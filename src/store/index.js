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
    dateLists: {/* [date: number]: ids */},
    themeLists: {/* [id: number]: ids */}
  },

  actions: {
    FETCH_LIST_DATA: ({commit, dispatch, state}, {date} = {date: moment().format('YYYYMMDD')}) => {
      commit('SET_ACTIVE_DATE', {date})
      return api.fetchItemsByDate(date)
          .then(body => Promise.resolve(body.stories.map((item, index, array) => item.id)))
          .then(ids => commit('SET_LIST', {date, ids}))
          .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
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
    SET_LIST: (state, {date, ids}) => {
      state.dateLists[date] = ids
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
    activeIds (state) {
      const {activeDate, dateLists} = state
      if (activeDate) {
        return dateLists[activeDate]
      } else {
        return []
      }
    },
    activeItems (state, getters) {
      return getters.activeIds.map(id => state.items[id]).filter(_ => _)
    }
  }
})

export default store
