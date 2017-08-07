// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store'
import {sync} from 'vuex-router-sync'
import moment from 'moment'

Vue.config.productionTip = false

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

Vue.use(VueResource)

moment.locale('zh-CN')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
