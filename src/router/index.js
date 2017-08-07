import Vue from 'vue'
import Router from 'vue-router'
import moment from 'moment'

const Detail = () => import('@/views/detail.vue')
const Home = () => import('@/views/home.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '*',
    //   redirect: '/'
    // },
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'date',
      path: '/:date(\\d{4}\\d{2}\\d{2})',
      component: Home
    },
    {
      name: 'story',
      path: '/story/:id(\\d+)',
      component: Detail
    },
    {
      path: '*',
      redirect: `/${moment().format('YYYYMMDD')}`
    }
  ]
})
