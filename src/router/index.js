import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export default new Router({
  routes: [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },
    // { path: '/', component: () => import('@/views/dashboard/index'), hidden: true },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      name: 'Dashboard',
      hidden: true,
      children: [{
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }]
    },
    {
      path: '/form',
      component: Layout,
      children: [
        {
          path: 'index',
          name: 'Form',
          component: () => import('@/views/form/index'),
          meta: { title: 'Form', icon: 'example' }
        }
      ]
    },
    { path: '*', redirect: '/404', hidden: true }
  ]
})
