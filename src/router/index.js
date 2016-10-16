import Vue from 'vue'
import Router from 'vue-router'
import moment from 'moment'

Vue.use(Router)

import ItemList from '../components/ItemList.vue'
import ItemView from '../views/ItemView.vue'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { name: 'date', path: '/:date(\\d{4}\\d{2}\\d{2})', component: ItemList},
    { name: 'story' , path: '/story/:id(\\d+)', component: ItemView },
    { path: '*', redirect: `/${moment().format('YYYYMMDD')}` }
  ]
})
