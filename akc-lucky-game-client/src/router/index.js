import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layouts/Layout'
import Dashboard from '@/pages/Dashboard'
import Participant from '@/pages/Participant'
import LuckyGuy from '@/pages/LuckyGuy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard page',
          component: Dashboard
        },
        {
          path: 'participant',
          name: 'Participant page',
          component: Participant
        },
        {
          path: 'lucky-guy',
          name: 'LuckyGuy page',
          component: LuckyGuy
        }
      ]
    }
  ]
})
